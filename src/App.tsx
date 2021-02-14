import { useCallback, useState } from "react";
import "./App.css";
import useWindowDimensions from "./useWindowDimensions";

const pricingCombos: {
  pageviews: string;
  pricePerMonth: number;
}[] = [
  {
    pageviews: "10k",
    pricePerMonth: 8,
  },
  {
    pageviews: "50k",
    pricePerMonth: 12,
  },
  {
    pageviews: "100k",
    pricePerMonth: 16,
  },
  {
    pageviews: "500k",
    pricePerMonth: 24,
  },
  {
    pageviews: "1m",
    pricePerMonth: 36,
  },
];

function App() {
  const { width } = useWindowDimensions();
  const [value, setValue] = useState("2");
  const [discountActivated, setDiscountActivated] = useState(false);

  const renderPricingRange = () => (
    <input
      className="PricingRange"
      min="0"
      max="4"
      step="1"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      style={{
        backgroundImage: `linear-gradient(to right, var(--strong-cyan) ${
          Number(value) * 25
        }%, var(--light-grayish-blue-1) 0)`,
      }}
      type="range"
    />
  );

  const getPrice = useCallback(() => {
    let price = pricingCombos[Number(value)].pricePerMonth;
    if (discountActivated) {
      price = 0.75 * price;
    }
    return price;
  }, [discountActivated, value]);

  return (
    <div className="App">
      <div className="TitleContainer">
        <div className="AppTitle">Simple, traffic-based pricing</div>
        <div className="AppSubtitle">
          Sign-up for our 30-day trial. No credit card required
        </div>
      </div>
      <div className="PricingCardContainer">
        <div className="PricingCard">
          <div className="PricingCardContent">
            {width > 375 ? (
              <>
                <div className="PricingDataContainer">
                  <div className="PricingViews">
                    {pricingCombos[Number(value)].pageviews} pageviews
                  </div>
                  <div className="PricingPrice">
                    <span className="PricingPriceNumber">${getPrice()}.00</span>
                    /month
                  </div>
                </div>
                {renderPricingRange()}
              </>
            ) : (
              <>
                <div className="PricingViews">
                  {pricingCombos[Number(value)].pageviews} pageviews
                </div>
                {renderPricingRange()}
                <div className="PricingPrice">
                  <span className="PricingPriceNumber">${getPrice()}.00</span>
                  /month
                </div>
              </>
            )}
            <div className="BillingContainer">
              <div className="BillingText">Monthly Billing</div>
              <label className="BillingToggle">
                <input
                  className="BillingToggleCheck"
                  onChange={() => {
                    setDiscountActivated(
                      (oldDiscountActivated) => !oldDiscountActivated
                    );
                  }}
                  type="checkbox"
                />
                <span className="BillingToggleSlider"></span>
              </label>
              <div className="BillingText">Yearly Billing</div>
              <div className="BillingTextDiscount">25% discount</div>
            </div>
          </div>
          <div className="PricingFooter">
            <ul className="PricingFeatures">
              <li>Unlimited websites</li>
              <li>100% data ownership</li>
              <li>Email reports</li>
            </ul>
            <button className="PricingButtonContainer">Start my trial</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
