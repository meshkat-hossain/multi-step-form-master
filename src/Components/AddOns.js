import React, { useState } from "react"
import { selectedPlanAndBill } from "./SelectPlan"
import check from "../images/icon-checkmark.svg"

const addOns = [
  {
    name: "Online sevice",
    info: "Access to multiplayer games",
    monthlyPrice: "1/mo",
    yearlyPrice: "10/yr",
    status: "none",
  },
  {
    name: "Larger storage",
    info: "Extra 1TB of cloude save",
    monthlyPrice: "2/mo",
    yearlyPrice: "20/yr",
    status: "none",
  },
  {
    name: "Customizable profile",
    info: "Custom theme on your profile",
    monthlyPrice: "2/mo",
    yearlyPrice: "20/yr",
    status: "none",
  },
]

export const selectedSummary = {
  selectedPlanAndBill,
  addon: [],
  completAddOn: [],
}

console.log(selectedSummary)

const AddOns = () => {
  const [myAddOn, setMyAddOn] = useState(selectedSummary.addon)
  const [addSelected, setAddselected] = useState([false, false, false])

  const getAddOnPrice = (count) => {
    let amount
    if (selectedSummary.selectedPlanAndBill.bill === "monthly") {
      amount = addOns[count].monthlyPrice
    } else {
      amount = addOns[count].yearlyPrice
    }
    return amount
  }

  const selectAddon = (index) => {
    if (!myAddOn.includes(addOns[index].name)) {
      selectedSummary.addon.push(addOns[index].name)
      selectedSummary.completAddOn.push({
        name: addOns[index].name,
        price: getAddOnPrice(index),
      })
    } else {
      selectedSummary.addon = selectedSummary.addon.filter((item) => {
        return item !== addOns[index].name
      })
      selectedSummary.completAddOn = selectedSummary.completAddOn.filter(
        (item) => {
          return item.name !== addOns[index].name
        }
      )
    }

    console.log(selectedSummary.addon)
    const newAddOn = addSelected.map((add, i) => {
      if (i === index) {
        if (add) {
          add = false
        } else {
          add = true
        }
      }
      return add
    })
    setAddselected(newAddOn)

    setMyAddOn(selectedSummary.addon)
    console.log(selectedSummary.completAddOn)
  }

  return (
    <div className='add-ons-container'>
      <h2 className='add-on-head'>Pick add-ons</h2>
      <p className='info'>Add-ons help enhance your gaming experience</p>
      {addOns.map((addon, i) => {
        const { name, info, monthlyPrice, yearlyPrice } = addon
        return (
          <label
            // htmlFor={name}
            className={`add-on-container ${addSelected[i] && "selected"}`}
            key={i}
            onClick={() => selectAddon(i)}
          >
            <div className='check-and-name'>
              {/* <input type='checkbox' name={name} id={name} /> */}
              <img
                src={check}
                alt='check'
                className={`check-image ${addSelected[i] && "checked"}`}
              />
              <section className='name-and-info'>
                <p className='addon-name'>{name}</p>
                <p className='addon-info'>{info}</p>
              </section>
            </div>
            <p className='addon-price'>
              +$
              {selectedSummary.selectedPlanAndBill.bill === "monthly"
                ? monthlyPrice
                : yearlyPrice}
            </p>
          </label>
        )
      })}
    </div>
  )
}

export default AddOns
