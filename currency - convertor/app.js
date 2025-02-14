const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };
  const Base_Url = "https://api.exchangerate-api.com/v4/latest/";
  const dropdownSelect = document.querySelectorAll(".dropdown select");
  const button = document.querySelector('button');
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const inputfromcurr=document.querySelector("#contval2");
  const outputtocurr=document.querySelector("#resultval");
  const msg=document.querySelector(".msg");
  const amountinput=document.querySelector("#contval1");
  for (let select of dropdownSelect) {
    for (currcode in countryList) {
      const newOption = document.createElement("option");
      newOption.innerText = currcode;
      newOption.value = currcode;
      if (select.name === "from" && currcode === "USD") {
        newOption.selected = "selected"
      }
      else if (select.name === "To" && currcode === "INR") {
        newOption.selected = "selected"
      }
      select.appendChild(newOption);
    }
    select.addEventListener('change', (evt) => {
      inputfromcurr.value=fromCurr.value;
      // outputtocurr.value=toCurr.value;
      updateflag(evt.target)
    })
  };
  
  const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newsrc;
  };

  button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
      amtval = 1;
      amount.value = 1;
    }
    const URL = `${Base_Url}${fromCurr.value.toLowerCase()}`;
  try {
    let response = await fetch(URL);
    if (response.ok) {
      let data = await response.json();
      const exchangeRate = data.rates[toCurr.value];
      if (exchangeRate === undefined) {
        console.error("Exchange rate is undefined");
      } else {
        let result = amtval * exchangeRate;
        outputtocurr.value = `${amtval} ${fromCurr.value} : ${result} ${ toCurr.value}`;
        outputtocurr.value = `${amtval} ${fromCurr.value} : ${result} ${ toCurr.value}`;
        msg.innerText=`1 ${fromCurr.value} = ${exchangeRate} ${toCurr.value}`;
        amountinput.value = '';
        amountinput.focus();
      }
    } else {
      console.error(`Error ${response.status}: ${response.statusText}`);
      let errorResponse = await response.text();
      console.error(errorResponse);
    }
  } catch (error) {
    console.error(error);

  }
});

//end code