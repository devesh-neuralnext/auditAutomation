import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auditsheet from './auditsheet';
import { read } from 'xlsx';
import Select from 'react-select';

const Template = () => {
  const [storeNumber, setStoreNumber] = useState('');

  const [filteredStoreNumber, setFilteredStoreNumber] = useState([]);

  const [storeMobileNumber, setStoreMobileNumber] = useState('');

  const [filteredStoreMobileNumber, setFilterStoreMobileNumber] = useState([]);

  const [storeName, setStoreName] = useState('');

  const [storeAddress, setStoreAddress] = useState('');

  const [brandName, setBrandName] = useState('');

  const [postSubmitted, setPostSubmitted] = useState(false);

  const [filteredBrandNames, setFilteredBrandNames] = useState([]);

  const [filteredStoreNames, setFilteredStoreNames] = useState([]);

  const [filteredStoreAddress, setFilteredStoreAddress] = useState([]);

  const [storeArray, setStoreArray] = useState([]);

  const [mergeStoreNameStoreArea, setMergeStoreNameStoreArea] = useState([]);

  const [storeArea, setStoreArea] = useState('');

  const [perfora, setPerfora] = useState([]);
  const [perforaSku, setPerforaSku] = useState([]);

  const [bamboo, setBamboo] = useState([]);
  const [bambooSku, setBambooSku] = useState([]);

  const [fillingStation, setFillingStation] = useState([]);
  const [fillingStationSku, setFillingStationSku] = useState([]);

  const [kanakKokan, setKonakKokan] = useState([]);
  const [kanakKokanSku, setKanakKokanSku] = useState([]);

  const [rootivate, setRootivate] = useState([]);
  const [rootivateSku, setRootivateSku] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    setPostSubmitted(true);
  };

  const handleBrandNameChange = selectedOption => {
    setBrandName(selectedOption ? selectedOption.value : '');
  };

  const handleStoreAddressChange = event => {
    setStoreAddress(event.target.value);
  };

  const handleStoreNameChange = selectedOption => {
    setStoreName(selectedOption ? selectedOption.value : '');
  };

  useEffect(() => {
    // Extract the store name without the store area
    const extractedStoreName = storeName.split(' - ')[0];

    // Update the store address based on the selected store name
    const selectedStoreAddress = filteredStoreAddress.find(
      (address, index) => filteredStoreNames[index] === extractedStoreName
    );
    setStoreAddress(selectedStoreAddress || '');
  }, [storeName, filteredStoreNames, filteredStoreAddress]);  

  useEffect(() => {
    if (storeArray) {
      const selectedStoreArea = storeArray.find(
        (address, index) => filteredStoreNames[index] === storeName
      );
      setStoreArea(selectedStoreArea || '');
      
    }
  }, [storeName, filteredStoreNames, storeArray]);

  useEffect(() => {
    const extractedStoreNumber = storeName.split(' - ')[0];
    const selectedStoreNumber = filteredStoreNumber.find(
        (address, index) => filteredStoreNames[index] === extractedStoreNumber
      );
      setStoreNumber(selectedStoreNumber || '');
      
    
  }, [storeName, filteredStoreNames, filteredStoreNumber]);

  useEffect(() => {
    const extractedStoreMobileNumber = storeName.split(' - ')[0];
    const selectedStoreMobileNumber = filteredStoreMobileNumber.find(
        (address, index) => filteredStoreNames[index] === extractedStoreMobileNumber
      );
      setStoreMobileNumber(selectedStoreMobileNumber || '');

      
    
  }, [storeName, filteredStoreNames, filteredStoreMobileNumber]);

  




  const handleFileUpload = event => {
    const file = event.target.files[0];

    // Read the XLSX file
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });

      const sheetNameForStoreNames = workbook.SheetNames[1];
      const worksheetForStoreNames = workbook.Sheets[sheetNameForStoreNames];

      const sheetNameForStoreAddress = workbook.SheetNames[1];
      const worksheetForStoreAddress =
        workbook.Sheets[sheetNameForStoreAddress];

      const sheetNameForStoreArea = workbook.SheetNames[1];
      const worksheetForStoreArea = workbook.Sheets[sheetNameForStoreArea];

      const sheetNameForStoreNumber = workbook.SheetNames[1];
      const worksheetForStoreNumber = workbook.Sheets[sheetNameForStoreNumber];

      const sheetNameForStoreMobileNumber = workbook.SheetNames[1];
      const worksheetForStoreMobileNumber =
        workbook.Sheets[sheetNameForStoreMobileNumber];

      const columnForStoreNames = 'C';
      const columnForStoreAddress = 'G';
      const columnForStoreArea = 'B';
      const columnForStoreNumber = 'A';
      const columnForStoreMobileNumber = 'F';

      const valuesForStoreNames = [];
      const valuesForStoreAddress = [];
      const valuesForStoreArea = [];
      const valuesForStoreNumber = [];
      const valuesForStoreMobileNumber = [];

      let rowForStoreNames = 2;

      let cellAddressForStoreNames = columnForStoreNames + rowForStoreNames;
      let cellAddressForStoreAddress = columnForStoreAddress + rowForStoreNames;
      let cellAddressForStoreArea = columnForStoreArea + rowForStoreNames;
      let cellAddressForStoreNumber = columnForStoreNumber + rowForStoreNames;
      let cellAddressForStoreMobileNumber =
        columnForStoreMobileNumber + rowForStoreNames;

      let cellValueForStoreNames =
        worksheetForStoreNames[cellAddressForStoreNames]?.v;

      let cellValueForStoreAddress =
        worksheetForStoreAddress[cellAddressForStoreAddress]?.v;

      let cellValueForStoreArea =
        worksheetForStoreArea[cellAddressForStoreArea]?.v;

      let cellValueForStoreNumber =
        worksheetForStoreNumber[cellAddressForStoreNumber]?.v;

      let cellValueForStoreMobileNumber =
        worksheetForStoreMobileNumber[cellAddressForStoreMobileNumber]?.v;

      let breakTheLoopForStoreNames = 0;

      while (breakTheLoopForStoreNames !== 3) {
        valuesForStoreNames.push(cellValueForStoreNames);
        valuesForStoreAddress.push(cellValueForStoreAddress);
        valuesForStoreArea.push(cellValueForStoreArea);
        valuesForStoreNumber.push(cellValueForStoreNumber);
        valuesForStoreMobileNumber.push(cellValueForStoreMobileNumber);

        rowForStoreNames++;

        cellAddressForStoreNames = columnForStoreNames + rowForStoreNames;
        cellAddressForStoreAddress = columnForStoreAddress + rowForStoreNames;
        cellAddressForStoreArea = columnForStoreArea + rowForStoreNames;
        cellAddressForStoreNumber = columnForStoreNumber + rowForStoreNames;
        cellAddressForStoreMobileNumber =
          columnForStoreMobileNumber + rowForStoreNames;

        cellValueForStoreNames =
          worksheetForStoreNames[cellAddressForStoreNames]?.v;

        cellValueForStoreAddress =
          worksheetForStoreAddress[cellAddressForStoreAddress]?.v;

        cellValueForStoreArea =
          worksheetForStoreArea[cellAddressForStoreArea]?.v;

        cellValueForStoreNumber =
          worksheetForStoreNumber[cellAddressForStoreNumber]?.v;

        cellValueForStoreMobileNumber =
          worksheetForStoreMobileNumber[cellAddressForStoreMobileNumber]?.v;

        if (cellValueForStoreNames === undefined) {
          breakTheLoopForStoreNames++;
        } else {
          breakTheLoopForStoreNames = 0;
        }
      }

      setFilteredStoreNames(valuesForStoreNames);
      setFilteredStoreAddress(valuesForStoreAddress);
      setFilteredStoreNumber(valuesForStoreNumber);
      setFilterStoreMobileNumber(valuesForStoreMobileNumber);
      setStoreArray(valuesForStoreArea);
  

      const mergeArray = valuesForStoreNames.map((name, index) => ({
        storeName: name,
        storeArea: valuesForStoreArea[index],
      }));

      setMergeStoreNameStoreArea(mergeArray);

      const sheetNameForBrands = workbook.SheetNames[6];
      const worksheetForBrands = workbook.Sheets[sheetNameForBrands];

      const columnForBrands = 'B';
      const valuesForBrands = [];
      let rowForBrands = 5;
      let cellAddressForBrands = columnForBrands + rowForBrands;
      let cellValueForBrands = worksheetForBrands[cellAddressForBrands]?.v;
      let breakTheLoopForBrands = 0;

      while (breakTheLoopForBrands !== 3) {
        valuesForBrands.push(cellValueForBrands);
        rowForBrands++;
        cellAddressForBrands = columnForBrands + rowForBrands;
        cellValueForBrands = worksheetForBrands[cellAddressForBrands]?.v;
        if (cellValueForBrands === undefined) {
          breakTheLoopForBrands++;
        } else {
          breakTheLoopForBrands = 0;
        }
      }

      setFilteredBrandNames(valuesForBrands);

      const sheetNameForPerfora = workbook.SheetNames[9];
      const worksheetForPerfora = workbook.Sheets[sheetNameForPerfora];

      const columnForPerfora = 'B';
      const columnForPerforaSku = 'C';
      const valuesForPerfora = [];
      const valuesForPerforaSku = [];
      let rowForPerfora = 4;

      let cellAddressForPerfora = columnForPerfora + rowForPerfora;
      let cellAddressForPerforaSku = columnForPerforaSku + rowForPerfora;

      let cellValueForPerfora = worksheetForPerfora[cellAddressForPerfora]?.v;
      let cellValueForPerforaSku =
        worksheetForPerfora[cellAddressForPerforaSku]?.v;

      let breakTheLoopForPerfora = 0;

      while (breakTheLoopForPerfora !== 3) {
        valuesForPerfora.push(cellValueForPerfora);
        valuesForPerforaSku.push(cellValueForPerforaSku);

        rowForPerfora++;

        cellAddressForPerfora = columnForPerfora + rowForPerfora;
        cellAddressForPerforaSku = columnForPerforaSku + rowForPerfora;

        cellValueForPerfora = worksheetForPerfora[cellAddressForPerfora]?.v;
        cellValueForPerforaSku =
          worksheetForPerfora[cellAddressForPerforaSku]?.v;

        if (cellValueForPerfora === undefined) {
          breakTheLoopForPerfora++;
        } else {
          breakTheLoopForPerfora = 0;
        }
      }

      setPerfora(valuesForPerfora);
      setPerforaSku(valuesForPerforaSku);

      const sheetNameForBamboo = workbook.SheetNames[10];

      const worksheetForBamboo = workbook.Sheets[sheetNameForBamboo];

      const columnForBamboo = 'B';
      const columnForBambooSku = 'C';

      const valuesForBamboo = [];
      const valuesForBambooSku = [];

      let rowForBamboo = 4;

      let cellAddressForBamboo = columnForBamboo + rowForBamboo;
      let cellAddressForBambooSku = columnForBambooSku + rowForBamboo;

      let cellValueForBamboo = worksheetForBamboo[cellAddressForBamboo]?.v;
      let cellValueForBambooSku =
        worksheetForBamboo[cellAddressForBambooSku]?.v;

      let breakTheLoopForBamboo = 0;

      while (breakTheLoopForBamboo !== 3) {
        valuesForBamboo.push(cellValueForBamboo);
        valuesForBambooSku.push(cellValueForBambooSku);

        rowForBamboo++;

        cellAddressForBamboo = columnForBamboo + rowForBamboo;
        cellAddressForBambooSku = columnForBambooSku + rowForBamboo;

        cellValueForBamboo = worksheetForBamboo[cellAddressForBamboo]?.v;
        cellValueForBambooSku = worksheetForBamboo[cellAddressForBambooSku]?.v;

        if (cellValueForBamboo === undefined) {
          breakTheLoopForBamboo++;
        } else {
          breakTheLoopForBamboo = 0;
        }
      }

      setBamboo(valuesForBamboo);
      setBambooSku(valuesForBambooSku);

      const sheetNameForFillingStation = workbook.SheetNames[11];
      const worksheetForFillingStation =
        workbook.Sheets[sheetNameForFillingStation];

      const columnForFillingStation = 'B';
      const columnForFillingStationSku = 'C';

      const valuesForFillingStation = [];
      const valuesForFillingStationSku = [];

      let rowForFillingStation = 4;

      let cellAddressForFillingStation =
        columnForFillingStation + rowForFillingStation;
      let cellAddressForFillingStationSku =
        columnForFillingStationSku + rowForFillingStation;

      let cellValueForFillingStation =
        worksheetForFillingStation[cellAddressForFillingStation]?.v;
      let cellValueForFillingStationSku =
        worksheetForFillingStation[cellAddressForFillingStationSku]?.v;

      let breakTheLoopForFillingStation = 0;

      while (breakTheLoopForFillingStation !== 3) {
        valuesForFillingStation.push(cellValueForFillingStation);
        valuesForFillingStationSku.push(cellValueForFillingStationSku);

        rowForFillingStation++;

        cellAddressForFillingStation =
          columnForFillingStation + rowForFillingStation;
        cellAddressForFillingStationSku =
          columnForFillingStationSku + rowForFillingStation;

        cellValueForFillingStation =
          worksheetForFillingStation[cellAddressForFillingStation]?.v;
        cellValueForFillingStationSku =
          worksheetForFillingStation[cellAddressForFillingStationSku]?.v;

        if (cellValueForFillingStation === undefined) {
          breakTheLoopForFillingStation++;
        } else {
          breakTheLoopForFillingStation = 0;
        }
      }

      setFillingStation(valuesForFillingStation);
      setFillingStationSku(valuesForFillingStationSku);

      const sheetNameForKonakKokan = workbook.SheetNames[12];
      const worksheetForKonakKokan = workbook.Sheets[sheetNameForKonakKokan];

      const columnForKonakKokan = 'B';
      const columnForKonakKokanSku = 'C';

      const valuesForKonakKokan = [];
      const valuesForKonakKokanSku = [];

      let rowForKonakKokan = 4;

      let cellAddressForKonakKokan = columnForKonakKokan + rowForKonakKokan;
      let cellAddressForKonakKokanSku =
        columnForKonakKokanSku + rowForKonakKokan;

      let cellValueForKonakKokan =
        worksheetForKonakKokan[cellAddressForKonakKokan]?.v;
      let cellValueForKonakKokanSku =
        worksheetForKonakKokan[cellAddressForKonakKokanSku]?.v;

      let breakTheLoopForKonakKokan = 0;

      while (breakTheLoopForKonakKokan !== 3) {
        valuesForKonakKokan.push(cellValueForKonakKokan);
        valuesForKonakKokanSku.push(cellValueForKonakKokanSku);

        rowForKonakKokan++;

        cellAddressForKonakKokan = columnForKonakKokan + rowForKonakKokan;
        cellAddressForKonakKokanSku = columnForKonakKokanSku + rowForKonakKokan;

        cellValueForKonakKokan =
          worksheetForKonakKokan[cellAddressForKonakKokan]?.v;
        cellValueForKonakKokanSku =
          worksheetForKonakKokan[cellAddressForKonakKokanSku]?.v;

        if (cellValueForKonakKokan === undefined) {
          breakTheLoopForKonakKokan++;
        } else {
          breakTheLoopForKonakKokan = 0;
        }
      }

      setKonakKokan(valuesForKonakKokan);
      setKanakKokanSku(valuesForKonakKokanSku);

      const sheetNameForRootivate = workbook.SheetNames[13];
      const worksheetForRootivate = workbook.Sheets[sheetNameForRootivate];

      const columnForRootivate = 'B';
      const columnForRootivateSku = 'C';

      const valuesForRootivate = [];
      const valuesForRootivateSku = [];

      let rowForRootivate = 4;

      let cellAddressForRootivate = columnForRootivate + rowForRootivate;
      let cellAddressForRootivateSku = columnForRootivateSku + rowForRootivate;

      let cellValueForRootivate =
        worksheetForRootivate[cellAddressForRootivate]?.v;
      let cellValueForRootivateSku =
        worksheetForRootivate[cellAddressForRootivateSku]?.v;

      let breakTheLoopForRootivate = 0;

      while (breakTheLoopForRootivate !== 3) {
        valuesForRootivate.push(cellValueForRootivate);
        valuesForRootivateSku.push(cellValueForRootivateSku);

        rowForRootivate++;

        cellAddressForRootivate = columnForRootivate + rowForRootivate;
        cellAddressForRootivateSku = columnForRootivateSku + rowForRootivate;

        cellValueForRootivate =
          worksheetForRootivate[cellAddressForRootivate]?.v;
        cellValueForRootivateSku =
          worksheetForRootivate[cellAddressForRootivateSku]?.v;

        if (cellValueForRootivate === undefined) {
          breakTheLoopForRootivate++;
        } else {
          breakTheLoopForRootivate = 0;
        }
      }

      setRootivate(valuesForRootivate);
      setRootivateSku(valuesForRootivateSku);
    };

    reader.readAsArrayBuffer(file);
  };

  const optionsForStoreNameAndStoreArea = mergeStoreNameStoreArea.map(item => ({
    value: `${item.storeName} - ${item.storeArea}`,
    label: `${item.storeName} - ${item.storeArea}`,
  }));

  const optionsForBrands = filteredBrandNames.map(name => ({
    value: name,
    label: name,
  }));

  return (
    <>
      {!postSubmitted ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <form className="template-form" onSubmit={handleSubmit}>
            <div className="row">
              <input
                style={{ marginBottom: '20px' }}
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
              />

              <div className="form-group">
                <label htmlFor="storeName">Store Name</label>
                <Select
                  closeMenuOnSelect
                  isMulti={false}
                  options={optionsForStoreNameAndStoreArea}
                  value={optionsForStoreNameAndStoreArea.find(
                    option => option.value === storeName
                  )}
                  onChange={handleStoreNameChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="storeAddress">Store Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="storeAddress"
                  placeholder="Store Address..."
                  value={storeAddress}
                  onChange={handleStoreAddressChange}
                />
              </div>

              <div className="form-group">
                <div className="mt-4">
                  <label htmlFor="category">Brand Name</label>
                  <Select
                    closeMenuOnSelect
                    isMulti={false}
                    options={optionsForBrands}
                    value={optionsForBrands.find(
                      option => option.value === brandName
                    )}
                    onChange={handleBrandNameChange}
                  />
                </div>
              </div>
            </div>

            <button
              style={{ marginTop: '20px' }}
              type="submit"
              className="btn btn-primary"
            >
              Upload
            </button>
          </form>
        </div>
      ) : (
        <Auditsheet
          storeName={storeName}
          storeAddress={storeAddress}
          brandName={brandName}
          perfora={perfora}
          perforaSku={perforaSku}
          bamboo={bamboo}
          bambooSku={bambooSku}
          fillingStation={fillingStation}
          fillingStationSku={fillingStationSku}
          kanakKokan={kanakKokan}
          kanakKokanSku={kanakKokanSku}
          rootivate={rootivate}
          rootivateSku={rootivateSku}
          storeArea={storeArea}
          storeNumber={storeNumber}
          storeMobileNumber={storeMobileNumber}
        />
      )}
    </>
  );
};

export default Template;
