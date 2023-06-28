import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Auditsheet = ({
  storeNumber,
  storeMobileNumber,
  storeName,
  storeAddress,
  brandName,
  perfora,
  perforaSku,
  bamboo,
  bambooSku,
  fillingStation,
  fillingStationSku,
  kanakKokan,
  kanakKokanSku,
  rootivate,
  rootivateSku,
}) => {
  const auditsheetRef = useRef(null);

  console.log(storeMobileNumber);
  console.log(storeNumber)

  const [rotate, setRotate] = useState('false');

  const handleDownload = () => {
    const input = auditsheetRef.current;
    setRotate(true);

    // Exclude the download button from the captured HTML content
    const downloadButton = input.querySelector('.download-button');
    if (downloadButton) {
      downloadButton.style.display = 'none';
    }

    html2canvas(input)
      .then(canvas => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = pdfHeight;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('auditsheet.pdf');

        // Reset the display of the download button
        if (downloadButton) {
          downloadButton.style.display = 'block';
        }
      })
      .catch(error => {
        console.log('Error generating PDF: ', error);
      });
  };

  return (
    <div ref={auditsheetRef} style={styles.auditsheet}>
      <div style={styles.info}>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>STORE NAME:</div>
          <div style={styles.infoValue}>[{storeNumber}]</div>
          <div style={styles.infoValue}>{storeName}</div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>STORE MOBILE NUMBER:</div>
          <div style={styles.infoValue}>{storeMobileNumber}</div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>STORE ADDRESS:</div>
          <div style={styles.infoValue}>{storeAddress}</div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>BRAND NAME:</div>
          <div style={styles.infoValue}>{brandName}</div>
        </div>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, width: '50px' }}>SR NO.</th>
            <th style={styles.th}>PARTICULARS</th>
            <th style={styles.th}>SKU Value</th>
            <th style={styles.th}>UNIT PLACED</th>
            <th style={styles.th}>WEEK 1 SKU</th>
            <th style={styles.th}>WEEK 2 SKU</th>
            <th style={styles.th}>WEEK 3 SKU</th>
            <th style={styles.th}>WEEK 4 SKU</th>
            <th style={styles.th}>TOTAL SKU SOLD</th>
            <th style={styles.th}>UNITS DAMAGED</th>
          </tr>
        </thead>
        <tbody>
          {brandName === 'Perfora' && perfora ? (
            perfora.map((val, key) => (
              <tr key={key}>
                <td style={styles.td}>{key + 1}</td>
                <td style={styles.td}>{val}</td>
                <td style={styles.td}>{perforaSku[key]}</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
              </tr>
            ))
          ) : brandName === 'Bamboo India' && bamboo ? (
            bamboo.map((val, key) => (
              <tr key={key}>
                <td style={styles.td}>{key + 1}</td>
                <td style={styles.td}>{val}</td>
                <td style={styles.td}>{bambooSku[key]}</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
              </tr>
            ))
          ) : brandName === 'The Filling Station' && fillingStation ? (
            fillingStation.map((val, key) => (
              <tr key={key}>
                <td style={styles.td}>{key + 1}</td>
                <td style={styles.td}>{val}</td>
                <td style={styles.td}>{fillingStationSku[key]}</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
              </tr>
            ))
          ) : brandName === 'Kanak Kokan' && kanakKokan ? (
            kanakKokan.map((val, key) => (
              <tr key={key}>
                <td style={styles.td}>{key + 1}</td>
                <td style={styles.td}>{val}</td>
                <td style={styles.td}>{kanakKokanSku[key]}</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
              </tr>
            ))
          ) : brandName === 'Rootivate' && rootivate ? (
            rootivate.map((val, key) => (
              <tr key={key}>
                <td style={styles.td}>{key + 1}</td>
                <td style={styles.td}>{val}</td>
                <td style={styles.td}>{rootivateSku[key]}</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        className="download-button"
        style={styles.download}
        onClick={handleDownload}
      >
        Download PDF
      </button>
    </div>
  );
};

export default Auditsheet;

const styles = {
  auditsheet: {
    width: '100%',
    height: '150vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transform: 'rotate(90deg)',
    marginTop: '300px',
  },

  info: {
    marginBottom: '20px',
    marginTop: '20px',
    paddingLeft: '20px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
  },
  infoLabel: {
    marginRight: '5px',
    fontWeight: 'bold',
  },
  infoValue: {
    fontWeight: 'bold',
  },
  table: {
    border: '2px solid',
    width: '100%',
    height: '100%',
    margin: '0 auto', // Add margin to center the table horizontally
    marginLeft: '20px', // Add left margin
    marginRight: '20px', // Add right margin
    borderCollapse: 'collapse',
  },

  th: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  },
  td: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  download: {
    width: 'fit-content',
    margin: '20px auto',
    fontWeight: 'bold',
  },
};
