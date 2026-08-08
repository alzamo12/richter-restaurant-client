import React from 'react';

const Table = ({ tableData, tableColumns }) => {
    return (
        <div className="overflow-x-auto bg-white md:px-20 max-h-[70vh] lg:h-[650px] md:mx-32 mt-10">
            <table className="table rounded-3xl my-10">
                {/* head */}
                <thead className="bg-[#D1A054] text-white rounded-3xl sticky top-0">
                    <tr className="uppercase inter font-semibold text-xs md:text-[16px] rounded-3xl">
                        <th className="py-9"></th>
                        {/* <th className="hidden lg:grid mt-4">Email</th> */}
                        {tableColumns.map((columnName, index) => <th
                            key={index}
                        >{columnName}
                        </th>)}
                        {/* <th >Email</th>
                            <th>price</th>
                            <th>Payent Date</th>  */}
                    </tr>
                </thead>
                <tbody className="inter text-lg ">
                    {
                        // payments.map((payment, index) => <tr className="hover ">
                        //     <th className="py-7">{index + 1}</th>
                        //     <td className="hidden lg:grid mt-4">{payment.email}</td>
                        //     <td className="">${payment.price}</td>
                        //     <td className="">{payment.orderedDate || payment.date}</td>

                        // </tr>)
                        tableData.map((rowData, index) => <tr>
                            <th className="py-7">{index + 1}</th>
                            {/* {Object.values(rowData).map((value, index) => <td key={index}>{value}</td>)} */}
                            {tableColumns.map((columnName, index) => <td key={index}>{rowData[columnName.toLowerCase()]}</td>)}
                        </tr>)
                    }
                    {/* row 2 */}


                </tbody>
            </table>
        </div>
    );
};

export default Table;