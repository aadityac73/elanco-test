import React, { useState, useEffect } from 'react';
import { RawData, RawDataSingle } from '../../main-app/http/api';
import api from '../../main-app/http/api';
import styles from './DataTable.module.css';
import TableRow from './TableRow';
import Loader from '../Loader/Loader';

interface DataTableProps {
  from: 'home' | 'application' | 'resource';
  applicationName: string | undefined;
  resourceName?: string | undefined;
}

const DataTable: React.FC<DataTableProps> = ({
  from = 'home',
  applicationName = '',
  resourceName = ''
}) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isAsc, setIsAsc] = useState(false);
  const [search, setSearch] = useState('');
  const searchParams = ['Date', 'Cost', 'InstanceId'];
  const sortData =
    (field: keyof RawDataSingle, type = 'string') =>
    () => {
      setData((prevData: any) => {
        const newData = JSON.parse(JSON.stringify(prevData));
        return newData.sort((a: RawDataSingle, b: RawDataSingle) => {
          let fa: any = type == 'number' ? Number(a[field]) : a[field];
          let fb: any = type == 'number' ? Number(b[field]) : b[field];
          if (fa < fb) {
            return isAsc ? 1 : -1;
          }
          if (fa > fb) {
            return isAsc ? -1 : 1;
          }
          return 0;
        });
      });
      setIsAsc((prev) => !prev);
    };

  const tempData: RawData[] =
    search.length > 0
      ? data.filter((item: any) => {
          return searchParams.some((newItem: any) => {
            return (
              item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(search.toLowerCase()) > -1
            );
          });
        })
      : [];

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let res: any;
      if (from == 'home') {
        res = await api.getApplicationData('Macao');
      } else if (from == 'application') {
        res = await api.getApplicationData(applicationName);
      }
      if (res?.isError) {
        setLoading(false);
        console.log(res?.getError());
      } else {
        setLoading(false);
        setData(() => {
          if (resourceName != '') {
            return res?.getValue()?.filter((item: any) => {
              return item.ServiceName == resourceName;
            });
          }
          return res?.getValue();
        });
      }
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <input
            type="text"
            placeholder="Search"
            autoFocus
            className={styles.search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles['table-wrapper']}>
            <table>
              <thead>
                <tr>
                  <th>Instance ID</th>
                  <th>
                    Date{' '}
                    <span className="sortIcon" onClick={sortData('Date')} />
                  </th>
                  <th>Location</th>
                  <th>Service Name</th>
                  <th>Quantity</th>
                  <th>
                    Cost{' '}
                    <span
                      className="sortIcon"
                      onClick={sortData('Cost', 'number')}
                    />
                  </th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {tempData.length == 0 && data.length == 0 ? (
                  <tr className={styles.dataNotPresent}>
                    <td colSpan={6}>Data not availabel</td>
                  </tr>
                ) : (
                  <>
                    {(tempData.length > 0 ? tempData : data).map(
                      (item: any, idx: number) => {
                        return <TableRow key={idx} {...item} />;
                      }
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default DataTable;
