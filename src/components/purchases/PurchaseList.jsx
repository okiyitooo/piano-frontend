import React from 'react';

const PurchaseList = ({purchases}) => {
    if (!purchases || purchases.length === 0) {
        return <p>No purchases found</p>;
    }
    return (
        <div className="purchase-list">
            <h3>Previous Purchases</h3>
            <ull>
                {
                    purchases.map((purchase) => {
                        return (
                            <li key={purchase.id}>
                                Purchase ID: {purchase.id}, User ID: {purchase.userId}, Piano ID: {purchase.pianoId}, Date: {purchase.date}
                            </li>
                        );
                    })
                }
            </ull>
        </div>

    )
}

export default PurchaseList;