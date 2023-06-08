export default function seatCreator(seatAmount, floors, floor) {
  const matrixSize = floors
    ? (Math.ceil(seatAmount / 5) + 2) * 5
    : ((Math.ceil(seatAmount / 5) + 4) * 5) / 2;

  const seats = Array.from({ length: matrixSize }, (_, index) => ({
    seatNumber:
      index === 2 + parseInt(index / 5) * 5
        ? ""
        : (index + 1 - parseInt((index + 2) / 5)).toString().padStart(2, "0") >
          seatAmount
        ? ""
        : index === 2 + parseInt(index / 5) * 5
        ? ""
        : (index + 1 - parseInt((index + 2) / 5)).toString().padStart(2, "0"),
    status:
      index === 2 + parseInt(index / 5) * 5
        ? "HALL"
        : (index + 1 - parseInt((index + 2) / 5)).toString().padStart(2, "0") >
          seatAmount
        ? "EMPTY"
        : "FREE",
    type:
      index === 2 + parseInt(index / 5) * 5
        ? "Pasillo"
        : (index + 1 - parseInt((index + 2) / 5)).toString().padStart(2, "0") >
          seatAmount
        ? "Vacío"
        : "Asiento",
    price: 0,
    index: floor === 1 ? index + seatAmount / 2 : index,
    seatType: index === 2 + parseInt(index / 5) * 5 ? "" : "Estándar",
  }));

  return seats;
}
