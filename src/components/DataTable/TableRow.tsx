import { useState } from 'react';
import { RawData } from '../../main-app/http/api';
import styles from './DataTable.module.css';

interface DialogProps {
  data: RawData;
  handleClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ data, handleClose }) => {
  return (
    <div className={styles.dialog}>
      <div onClick={handleClose} className={styles.dialogBackdrop}></div>
      <div className={styles.dialogContainer}>
        <span className={styles.closeBtn} onClick={handleClose}>
          X
        </span>
        <div className={styles.instanceId}>
          <span>Instance ID:</span> {data?.InstanceId}
        </div>
        <div className={styles.dialogGrid}>
          <div className={styles.dialogGridItem}>
            <div>
              <span>Consumed Quantity:</span> {data?.ConsumedQuantity}
            </div>
            <div>
              <span>Cost:</span> {data?.Cost}
            </div>
            <div>
              <span>Date:</span> {data?.Date}
            </div>
          </div>
          <div className={styles.dialogGridItem}>
            <div>
              <span>Meter Category:</span> {data?.MeterCategory}
            </div>
            <div>
              <span>Resource Group:</span> {data?.ResourceGroup}
            </div>
            <div>
              <span>Resource Location:</span> {data?.ResourceLocation}
            </div>
          </div>
          <div className={styles.dialogGridItem}>
            <div>
              <span>Unit Of Measure:</span> {data?.UnitOfMeasure}
            </div>
            <div>
              <span>Location:</span> {data?.Location}
            </div>
            <div>
              <span>Service Name:</span> {data?.ServiceName}
            </div>
          </div>
        </div>
        <div className={styles.instanceId}>
          <span>Tags</span>
        </div>
        <div className={styles.dialogGrid}>
          <div className={styles.dialogGridItem}>
            <div>
              <span>App Name:</span><br/> {data?.Tags?.['app-name']}
            </div>
          </div>
          <div className={styles.dialogGridItem}>
            <div>
              <span>Enviroment:</span> {data?.Tags?.environment}
            </div>
          </div>
          <div className={styles.dialogGridItem}>
            <div>
              <span>Business Unit:</span> {data?.Tags?.['business-unit']}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow: React.FC<RawData> = (props) => {
  const [dialog, setDialog] = useState(false);
  const openDialog = () => {
    setDialog(true);
  };
  const closeDialog = () => {
    setDialog(false);
  };
  return (
    <>
      <tr>
        <td>{props?.ConsumedQuantity}</td>
        <td>{props?.Cost}</td>
        <td>{props?.Date}</td>
        <td>{props?.MeterCategory}</td>
        <td>{props?.ResourceGroup}</td>
        <td>{props?.UnitOfMeasure}</td>
        <td>{props?.ServiceName}</td>
        <td><span onClick={openDialog} className={styles.viewBtn}>View</span></td>
      </tr>
      {dialog && <Dialog handleClose={closeDialog} data={props} />}
    </>
  );
};

export default TableRow;
