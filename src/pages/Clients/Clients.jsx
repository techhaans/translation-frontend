import React from "react";
import "./Clients.scss";

const clients = [
    { name: "Jai Techoon" },
    { name: "KNRIT" },
    { name: "HTG (HaansTechGlobal)" },
];

const ClientMarquee = () => {
    return (
        <div className="client-marquee-section">
            <h2 className="section-heading">🌟 Our New Customers</h2>
            <div className="marquee-container">
                <div className="marquee">
                    <div className="track">
                        {[...clients, ...clients].map((client, index) => (
                            <div key={index} className="client-logo">
                                {client.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientMarquee;
