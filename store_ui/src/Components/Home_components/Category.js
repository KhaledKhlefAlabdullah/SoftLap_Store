import { Button } from "react-bootstrap";

export default function Category(props){
    return (  <Button
        key={props.id}
        onClick={() => props.clk}
        className={
          props.p_quantity > 0
            ? "btn w-auto h-auto my-box-shadow rounded-pill m-3"
            : "btn w-auto h-auto my-box-shadow rounded-pill m-3 disabled"
        }
      >
        <div className="d-inline-block">
          <h4>{props.name}</h4>
        </div>
        <div className="counter-shopping bg-danger rounded-circle d-flex justify-content-center align-item-center c-white">
          {props.p_quantity}
        </div>
      </Button>);
}