import { Container } from "react-bootstrap";
import Hero_Section from "../Components/Home_components/Hero_Section";
import Separator from "../Components/Separator";
import Products_Section from "../Components/Home_components/Products_Section";
export default function Home(){
    return (
        <>
            <Separator text={"اهلا وسهلا بك"} />
                <Container className="section-me bg-section-color pt-1 pb-1 mb-3 my-box-shadow">
                    <Hero_Section/>
                </Container> 
                <Container className="section-me bg-section-color pt-1 pb-1 mb-3 my-box-shadow">
                    <Products_Section/>
                </Container>
            <Separator text={'شكراً لزيارتك'}/>
        </>
    );
}