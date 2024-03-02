import "../Wares/wares.css";

export default function WaresList({ list }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="wareslist-main-wrapper">
      <h1>WARES LIST:</h1>
      {list?.map((ware) => {
        return (
          <div key={ware.ware_id} className="wareslist-wrapper">
            <div>
              <div className="wareslist-title-wrapper">
                <div>{ware.title}</div>
                <div className="wareslist-date-wrapper">
                  {formatDate(ware.date)}
                </div>
              </div>
              <div className="wareslist-description-wrapper">
                Description: {ware.description}
              </div>
              <div>
                <br></br>
              </div>
              <div className="wareslist-user-information">
                <div>{ware.fullname}</div>
                <div>Email: {ware.email}</div>
                <div>Phone Number: {ware.phonenumber}</div>{" "}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
