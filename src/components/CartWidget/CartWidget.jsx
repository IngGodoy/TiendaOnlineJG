import "./CartWidget.css"

const CartWidget = () => {
  return (
    <div>
      <img id="imgIncono"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRtfaVx5DisNr2qRNtIo443Qv-jn7deffGKA&usqp=CAU"
        alt="incono de carrito de compras"
      />
      <p id="containerCount">0</p>
    </div>
  );
};
export default CartWidget;
