import React from "react"
import { selectedSummary } from "./AddOns"

console.log(selectedSummary)

const Summary = ({ gotoPlan }) => {
  const getTotal = () => {
    let planTotal = selectedSummary.selectedPlanAndBill.price()
    planTotal = planTotal.substring(0, planTotal.length - 3)
    let formartedAddPrice = selectedSummary.completAddOn.map((item) => {
      return item.price.substring(0, item.price.length - 3)
    })
    console.log(formartedAddPrice)
    let total = formartedAddPrice.reduce((acc, curr) => {
      acc += Number(curr)
      return acc
    }, Number(planTotal))
    // let total = Number(planTotal) + addTotal
    return total
  }

  return (
    <div className='summary-container'>
      <h2 className='summary-head'>Finishing Up</h2>
      <p className='info'>
        Double-check everything looks okay before confirming
      </p>
      <section className='summary-info'>
        <article className='summary-plan'>
          <span>
            <p className='chosen-plan'>
              {`${selectedSummary.selectedPlanAndBill.plan} (${selectedSummary.selectedPlanAndBill.bill})`}
            </p>
            <p className='link' onClick={gotoPlan}>
              Change
            </p>
          </span>
          <p className='summary-plan-price'>
            ${selectedSummary.selectedPlanAndBill.price()}
          </p>
        </article>
        <div className='divider'></div>
        <article className='summary-addon'>
          {selectedSummary.addon.length === 0
            ? "No Add-on selected"
            : selectedSummary.completAddOn.map((addon, i) => {
                const { name, price } = addon
                return (
                  <article className='each-addon-selected' key={i}>
                    <p className='name'>{name}</p>
                    <p className='price'>+${price}</p>
                  </article>
                )
              })}
        </article>
      </section>
      <section className='total'>
        <p className='total-word'>{`Total (per ${
          selectedSummary.selectedPlanAndBill.bill === "monthly"
            ? "month"
            : "year"
        })`}</p>
        <p className='sum-total'>
          +$
          {`${getTotal()}${
            selectedSummary.selectedPlanAndBill.bill === "monthly"
              ? "/mo"
              : "/yr"
          }`}
        </p>
      </section>
    </div>
  )
}

export default Summary
