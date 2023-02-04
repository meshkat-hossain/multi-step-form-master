import React, { useState } from "react"
import arcade from "../images/icon-arcade.svg"
import advanced from "../images/icon-advanced.svg"
import pro from "../images/icon-pro.svg"

const planInfo = [
  {
    image: arcade,
    name: "arcade",
    monthly: "9/mo",
    yearly: "90/yr",
  },
  {
    image: advanced,
    name: "advanced",
    monthly: "12/mo",
    yearly: "120/yr",
  },
  {
    image: pro,
    name: "pro",
    monthly: "15/mo",
    yearly: "150/yr",
  },
]

export let selectedPlanAndBill = {
  bill: "monthly",
  plan: "arcade",
  price: function () {
    let price = 500
    if (this.plan === "arcade") {
      price = planInfo[0][this.bill]
    } else if (this.plan === "advanced") {
      price = planInfo[1][this.bill]
    } else {
      price = planInfo[2][this.bill]
    }
    return price
  },
}

const SelectPlan = () => { 
  const [billPlan, setBillPlan] = useState(selectedPlanAndBill.bill)
  const [myPlan, setMyPlan] = useState(selectedPlanAndBill.plan)

  const changeBill = () => {
    if (billPlan === "monthly") {
      selectedPlanAndBill.bill = "yearly"
    } else {
      selectedPlanAndBill.bill = "monthly"
    }
    setBillPlan(selectedPlanAndBill.bill)
    console.log(selectedPlanAndBill.price())
  }

  const selectPlan = (index) => {
    selectedPlanAndBill.plan = planInfo[index].name
    setMyPlan(selectedPlanAndBill.plan)
  }

  return (
    <div className='select-plan-container'>
      <h2 className='plan-head'>Select your plan</h2>
      <p className='info'>You have the option of monthly or yearly billing</p>
      <section className='plans-group'>
        {planInfo.map((plan, i) => {
          const { image, name, monthly, yearly } = plan
          return (
            <article
              className={`plan ${myPlan === name && "active-plan"}`}
              key={i}
              onClick={() => selectPlan(i)}
            >
              <img src={image} alt={name} />
              <section className='name-and-price'>
                <p className='plan-name'>{name}</p>
                <p className='plan-bill'>
                  ${billPlan === "monthly" ? monthly : yearly}
                </p>
              </section>
            </article>
          )
        })}
      </section>
      <article className='bill-options'>
        <p
          className={`monthly bill ${billPlan === "monthly" && "unfade-bill"}`}
        >
          Monthly
        </p>
        <span className='check' onClick={changeBill}>
          <span className={`chosen ${billPlan}`}></span>
        </span>
        <p className={`yearly bill ${billPlan === "yearly" && "unfade-bill"}`}>
          Yearly
        </p>
      </article>
    </div> 
  )
}

export default SelectPlan
