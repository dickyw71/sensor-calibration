# User Activities and Tasks
- Find a Sensor
    - Basic search by sensor Barcode
    - Show list of sensor types
    - Select sensor type from list
    - Show list of sensors as sublist of sensor type   
    - Select sensor by barcode from list
    - Show list of calibrations as sublist of a sensor
    - Select calibration for a sensor 
- View Sensor details
    - Show sensor details
    - Show list of auxiliary sensors       
- View details of a Sensor Calibration 
    - Show sensor calibration details
    - Show sensor calibration certificate
    - Print sensor calibration certificate
- Create a Sensor Type
    - Enter Sensor type details
    - Create sensor parts




# User Stories

- I can search for the details of a sensor by entering the sensor barcode, like 'TZ000002', and the application displays the detailed sensor information. Detailed information includes: 
    - Sensor Type (description)
    - Sensor Part Def
    - OEM serial number
    - Sensor Barcode
    - Project Name
    - Calibration Due Date (cal_due_date)
    - Last Revision Date (sensor.revision_dt)
    - In-use (sensor.obsolete_flag)
    - Auxiliary Addresses  

- I can select a Sensor Type from a list and the application displays a list of all sensors of the selected type
    - Display of list of all Sensor Types
    - I can select a Sensor and see the list of that sensors calibrations 
    -

# Possible enhancements
- Use local storage to improve the application performance