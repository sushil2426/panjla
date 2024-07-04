import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import axios from 'axios';

const HourlyLogs = () => {
  const [dateTime, setDateTime] = useState(new Date().toISOString().split('T')[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(dateTime);
  }, [dateTime]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const getData = async (date) => {
    try {
      const res = await axios.get(`http://localhost:3435/api/fetch-hourly-logs?date=${date}`);
      console.log("data", res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <Layout>
      <div className='flex flex-col items-center'>
        <div className="text-2xl sm:text-3xl text-purple-500 font-mono font-bold mt-8 sm:mt-12">
          Check Hourly Logs
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <form onSubmit={(e) => e.preventDefault()} className="w-full sm:w-auto">
            <input
              type="date"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="border p-2 rounded w-full sm:w-auto"
            />
          </form>
        </div>

        {isVisible && (
          <div className='w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 px-4 py-10'>
            <div className="w-full overflow-x-auto border border-gray-900 p-2">
              <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="text-gray-900 text-center py-3 px-3">
                      Date/Time
                    </th>
                    <th scope="col" className="text-gray-900 text-center py-3">
                      REN Count
                    </th>
                    <th scope="col" className="text-gray-900 text-center py-3">
                      SUB Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((log, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {log.HOUR}
                      </th>
                      <td className="text-center py-4">
                        {log.REN}
                      </td>
                      <td className="text-center py-4">
                        {log.SUB}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HourlyLogs;
