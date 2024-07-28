import { Container } from "react-bootstrap";
import { useContext, useState } from "react";
import mall from "../../assets/images/hero_images/mall.png";
import beard from "../../assets/images/hero_images/beard.jpeg";
import gazelle from "../../assets/images/hero_images/gazelle.jpeg";
import gate from "../../assets/images/hero_images/forest_gate.jpeg";
import road from "../../assets/images/hero_images/road_to_moon.jpeg";
import { Theme_Context } from "../../Context/Change_Theme_Context";

export default function Hero_Section() {

  const theme_context = useContext(Theme_Context);

  return (
    <Container className="home-section mt-2 mb-2 dir-rtl my-box-shadow">
      <div className="row">
        <div className="col-md-12 col-lg-6 hero-sections rt hero-rt mb-0">
          <div className="contant-d">
            <h3>الصفحة الرئيسة</h3>
            <p>
              <h5>مرحبًا بك في متجرنا الإلكتروني،</h5>
              متجرنا يقدم لك تجربة تسوق عبر الإنترنت مميزة مع العديد من المزايا:
            </p>
          </div>

          <div className="row features pl-4">
            <div className="col-lg-2 my-inset-shadow hero-card d-flex align-items-center justify-content-center">
              <div className="hero-card-face hero-card-front">
                <h6>منتجات متنوعة:</h6>
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="hero-card-face hero-card-back">
                <p>
                  اكتشف مجموعة متنوعة من المنتجات عبر مختلف الفئات بجودة عالية
                  وأسعار تنافسية.
                </p>
              </div>
            </div>
            <div className="col-lg-2 my-inset-shadow hero-card d-flex align-items-center justify-content-center">
              <div className="hero-card-face hero-card-front">
                <h6>توصيل سريع:</h6>
                <i className="fas fa-shipping-fast"></i>
              </div>
              <div className="hero-card-face hero-card-back">
                <p>
                  نوفر خدمة توصيل سريعة وموثوقة لمنتجاتك مباشرة إلى باب منزلك.
                </p>
              </div>
            </div>
            <div className="col-lg-2 my-inset-shadow hero-card d-flex align-items-center justify-content-center">
              <div className="hero-card-face hero-card-front">
                <h6>تجربة تسوق مريحة:</h6>
                <i className="fas fa-smile-wink"></i>
              </div>
              <div className="hero-card-face hero-card-back">
                <p>
                  موقعنا سهل الاستخدام ومتوافق مع الأجهزة المحمولة، مما يتيح لك
                  التسوق بكل سهولة وأينما كنت.
                </p>
              </div>
            </div>
            <div className="col-lg-2 my-inset-shadow hero-card d-flex align-items-center justify-content-center">
              <div className="hero-card-face hero-card-front">
                <h6>عروض وخصومات:</h6>
                <i class="fas fa-user-tag"></i>{" "}
              </div>
              <div className="hero-card-face hero-card-back">
                <p>توقع عروضًا حصرية وخصومات رائعة على منتجات مختارة.</p>
              </div>
            </div>
            <div className="col-lg-2 my-inset-shadow hero-card d-flex align-items-center justify-content-center">
              <div className="hero-card-face hero-card-front">
                <h6>دعم عملاء ممتاز:</h6>
                <i className="fas fa-headset"></i>
              </div>
              <div className="hero-card-face hero-card-back">
                <p>
                  فريق دعم العملاء لدينا مستعد لمساعدتك في حالة وجود أي
                  استفسارات أو مشاكل.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-6 hero-sections lt imgs-container">
          <img src={mall} alt="l-t-img" className="img-lt imgs" />
        </div>
        <div className="col-6 col-md-6 col-lg-3 hero-sections rb imgs-container">
          <img
            src={theme_context.theme === "dark" ? beard : gate}
            alt="r-b-img"
            className="imgs"
          />
        </div>
        <div className="col-6 col-md-6 col-lg-3 hero-sections rb-c">
          <div className="contant-d">
            <h6> اكتشف عالمًا من المنتجات:</h6>
            <p>
               عبر مختلف الفئات بجودة عالية وأسعار تنافسية. مع
              خدمة التوصيل السريعة والموثوقة، يصل طلبك مباشرة إلى باب منزلك.
            </p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 hero-sections lb-c imgs-container">
          <img
            src={theme_context.theme === "dark" ? gazelle : road}
            alt="l-b-c-img"
            className="imgs"
          />
        </div>
        <div className="col-6 col-md-6 col-lg-3 hero-sections lb">
          <div className="contant-d">
            <h6>تجربة تسوق مريحة تنتظرك:</h6>
            <p>
              حيث يُمكنك التسوق بكل سهولة ومرونة على
              موقعنا المتوافق مع الأجهزة المحمولة. استفد من عروضنا وخصوماتنا
              الحصرية على مجموعة مختارة من المنتجات. فريق دعم العملاء لدينا
              مستعد لمساعدتك في حالة وجود أي استفسارات أو مشاكل. ابدأ تجربتك
              التسوقية الرائعة اليوم واكتشف عالم المنتجات الرائعة التي نقدمها.
            </p>
          </div>
        </div>
      </div>
      <h1>
        استمتع بتجربة تسوق رائعة معنا واحصل على المنتجات التي تحتاجها بسهولة
        وراحة. نحن هنا لخدمتك!
      </h1>
    </Container>
  );
}
