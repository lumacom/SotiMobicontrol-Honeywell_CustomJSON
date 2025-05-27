var file = new mobicontrol.io.File('/sdcard/honeywell/sysinfo/sysinfo.txt');  
var text = file.readText();
var outputfile = new mobicontrol.io.File('/sdcard/sysinfo.json');

function parseTxtToJson(text) {
    const jsonOutput = {};

    // Splitting the text into sections
    const sections = text.split(/\n-{20,}\n/);

    sections.forEach(section => {
        section = section.trim();
        if (!section) return;

        const lines = section.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        if (lines.length === 0) return;

        // Determining the section name
        var sectionName = "none";
        if (lines[0].includes(':')) {
            // If the first line contains ':', it is a key-value pair, not a section header
            sectionName = 'SYSTEM_DATA'; // Default name for data without an explicit header
        } else {
            sectionName = lines[0].replace(/[^a-zA-Z0-9_]/g, '_').toUpperCase(); // Convert to snake_case format
            lines.shift(); // Remove the section header
        }

        if (!jsonOutput[sectionName]) {
            jsonOutput[sectionName] = {};
        }

        lines.forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
                var key = parts[0].trim().replace(/[^a-zA-Z0-9_]/g, "_").toUpperCase();
                var value = parts.slice(1).join(':').trim();

                // Handling specific cases, e.g. date and time
                if (key === 'DATE_TIME') {
                    key = 'DATE_TIME_SYSTEM'; // Renamed to avoid collision
                } else if (key.startsWith('MEMORY_') || key.startsWith('IPSM_') || key.startsWith('INTERNAL_STORAGE_') || key.startsWith('DATA_PARTITION_')) {
                    // Convert memory values to a number (MB)
                    const match = value.match(/(\d+\.\d+)\s*MB/);
                    if (match) {
                        value = parseFloat(match[1]);
                    }
                } else if (key.startsWith('ID_')) {
                    // Remove ID_ from HSM SYSTEM INFO keys
                    key = key.substring(3);
                }

                jsonOutput[sectionName][key] = value;
            }
        });
    });

    return JSON.stringify(jsonOutput, null, 2);
}

outputfile.writeText(parseTxtToJson(text));
