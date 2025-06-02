let aggregatedData = [];

function convertTo24(time, ampm) {
  let [h, m] = time.split(':').map(Number);
  if (ampm.toLowerCase() === 'pm' && h !== 12) h += 12;
  if (ampm.toLowerCase() === 'am' && h === 12) h = 0;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function extractAndAggregate(lines) {
  const singlePattern = /\b(100|[1-9][0-9]?|[1-9])\s*=\s*(RS|rs|₹)?\s*(\d+)\s*(RS|rs|₹)?\b/g;
  const multiPattern = /\b((?:\d{1,3},)+\d{1,3})\s*=\s*(RS|rs|₹)?\s*(\d+)\s*(RS|rs|₹)?\b/g;
  const datePattern = /^(\d{2}\/\d{2}\/\d{2}), (\d{1,2}:\d{2})\s?(am|pm)?/i;

  const sums = {};
  const startTime = new Date(document.getElementById('startTime').value);
  const endTime = new Date(document.getElementById('endTime').value);

  for (const line of lines) {
    const dateMatch = line.match(datePattern);
    if (!dateMatch) continue;

    const dateStr = `20${dateMatch[1].split('/').reverse().join('-')}T${convertTo24(dateMatch[2], dateMatch[3] || '')}`;
    const msgTime = new Date(dateStr);
    if (isNaN(msgTime.getTime()) || msgTime < startTime || msgTime > endTime) continue;

    const extractedIndices = new Set();
    let match;

    while ((match = multiPattern.exec(line)) !== null) {
      const indexes = match[1].split(',').map(str => parseInt(str.trim(), 10));
      const amount = parseInt(match[3], 10);
      indexes.forEach(index => {
        if (index >= 1 && index <= 100) {
          sums[index] = (sums[index] || 0) + amount;
          extractedIndices.add(index);
        }
      });
    }

    while ((match = singlePattern.exec(line)) !== null) {
      const index = parseInt(match[1], 10);
      const amount = parseInt(match[3], 10);
      if (!extractedIndices.has(index) && index >= 1 && index <= 100) {
        sums[index] = (sums[index] || 0) + amount;
      }
    }
  }

  return Object.entries(sums).map(([index, amount]) => ({
    index: parseInt(index, 10),
    amount
  }));
}

document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const content = e.target.result;
    const lines = content.split('\n');
    aggregatedData = extractAndAggregate(lines);
    if (aggregatedData.length) {
      alert(`Extracted and summed ${aggregatedData.length} unique indices! Ready to export.`);
      document.getElementById('exportBtn').disabled = false;
    } else {
      alert('No valid data found in selected time range!');
      document.getElementById('exportBtn').disabled = true;
    }
  };
  reader.readAsText(file);
});

document.getElementById('exportBtn').addEventListener('click', function() {
  if (!aggregatedData.length) {
    alert('No data to export.');
    return;
  }

  const wsData = [
    ['Index', 'Amount'],
    ...aggregatedData.map(item => [item.index, item.amount])
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'WhatsApp Data');
  XLSX.writeFile(wb, 'whatsapp_summed_data.xlsx');
});
