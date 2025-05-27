SotiMobicontrol-Honeywell_CustomJSON
This script converts sysinfo.txt into JSON format, allowing it to be used as custom data in SOTI.

It has been tested on Honeywell CT40 and CT40XP devices.

By default, SOTI does not allow access to the part number of a Honeywell device, the internal scanner part number/version, or the device's manufacturing date.
This information, however, is available in the sysinfo.txt file located in the Honeywell/sysinfo directory on the internal memory.

This JavaScript script creates a sysinfo.json file in %sdcard%, which can then be used as custom data in SOTI.

Example usage in  Custom Data: 
Name: MF_DATE
Build Type: JSON File
JSON File Path: %sdcard%sysinfo.json
JSON Path Expression: $.SYSTEM_DATA.FINAL_ASSEMBLY_DATE
Data Type: STRING
Description: Manufacture date of the Honeywell device


