import React from 'react';

interface Props {
    data: { [key: string]: string };
}

const DisplayResult: React.FC<Props> = ({ data }) => {
    return (
        <html>
            <body>
                {/* step6 : 顯示回傳結果 */}
                {Object.keys(data).map((key) => (
                    <div key={key}>
                        <label>{key}</label>
                        <input type="text" value={data[key]} disabled />
                    </div>
                ))}
            </body>
        </html>
    );
};

export default DisplayResult;
