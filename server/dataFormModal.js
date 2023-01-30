const defaultForm = {
  id: "1",
  name: "Contact form 1",
  data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form1.png' />",
};

const dataFormTemplate = [
  {
    id: "1",
    name: "Contact form 1",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form1.png' />",
  },
  {
    id: "2",
    name: "Contact form 2",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form2.png' />",
  },
  {
    id: "3",
    name: "Contact form 3",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form3.png' />",
  },
  {
    id: "4",
    name: "Contact form 4",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form4.png' />",
  },
  {
    id: "5",
    name: "Newsletter form",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/b2b5/9448/511324dbf69922eeb3e247b5fd53783b?Expires=1675036800&Signature=XVT-ZOVICBOMVzTg6jj29BUaA32JktMZ6Dz0ATKmOv5AklCEszRseIY0GT2A-yG7VHUM2jsBvKFE6LiRMm46o4cjIV2jDiq8noIsmlaU2Kt~g-PD-GP91R4BToo9Q5GPBiqTNqJSnCUIQivW4JHYYKcw-cEBO4ARVi90IXnjwhXGTTX4QfG1~184AgV~NtSSO1djKHNMKvLDO24NXiH-6038v0euvvGLYwehkrK-TCBqxwywX2uMaHzHbE0QPumg83p2jDCRZzNHCboBfwa~SU8UPKZ5kO16zz-0v9heUjm~Hmg3JSGxhCz6~jaid2wqvBL6Q7cNy8dYEsWV4YcaPg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    id: "6",
    name: "Servey form",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/d811/045e/4a5f146da5c9770ff192becbebb52a2c?Expires=1675036800&Signature=dNcMySqHLDEnGOqTMtv-rxtbPkqcUshgrMxdenzG5Gnsdq-dbYgIRHsXiJIVOiT42j1SiZYhvHXWBEfZDw-U0Dr2iHjpEVIzUinkSHLvMHCjlx4grcyf4o09oqpMWBETOvvx0oNok~hWg9iyi27KuzbiLnF170CzRbVfOs9hcEXkwqcRP2FWDcy9iBxJj5DYhQhjwwuHvLl4l02OZ9Gas5CKEx2z~9I3U7NZNots-VeyylCt6H7Lrhw8QdAAdhiZ4hvnZP9ozWWTI3T~lkgy7g4Sxt6sAsEaxPXJcMrPSgZbzrxJ860RrtODBRPFcN8gAuELfy41LuaDl0pkgBnKBA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    id: "12",
    name: "Online Booking Form",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/online-booking-form.png' />",
  },
  {
    id: "13",
    name: "Customer Satisfaction Survey",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/customer-satisfaction-survey.png' />",
  },
  {
    id: "14",
    name: "IT Service Request Form",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/it-service-request-form.png' />",
  },
  {
    id: "7",
    name: "Booking form",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/c064/4e96/bef70469d334a33138ee24ea14c75fdb?Expires=1676246400&Signature=iDeHSYr4x3KKJCSEem3W3~GkPREidlz80r7WMm8AZtL3ubG2elTWTrMEP7iaCpovd0YSFmeLGjqIeTe3tAcX5jnxMyaV20Rjt7KWhG6PhjYSs0~lnTlvJhFtr--ucpnYJ5CXZuD8MdhV5ViAitbkc0LTJjdEEGFhrl-zvyph3tcqMIe-4dQ6eLebze4Z9Pad2FwyPQ1v46MaoAJX2n1JVjysLSCMUqtGVEDdeLCNjnDqk4c7uXT-Lhe6XtbG3XcTKBNX5hxqRRPGG3pxiQ8sm9f4fWj3-yOx41DhyWvhpGZSL8jyWGr~5H9~yvhfPssRsGoFIdw8ppo2JlVHDTjwAg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    id: "8",
    name: "Request for quote",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/fa92/7aff/085ad981bce012130f7ffaea960c2de4?Expires=1676246400&Signature=G4FIPGvQT1eoW7JUL8ZpTmOo-b7cwan2QAXygir6xK6eQCH~eIbCearU58lOWxLEUc5js2uXby23lHNu6DSPb8MfcjfesS6sFa-2czgc7NvPpoJg6oU~L82Gm9SdpkIUdXkOdA6iym62TEmWoWljlu3KuRlaajxAB1EtwzEPta1Dc9ovaSusfdbJ4hG6iQfZ3XoQ6wykddx5YRxgy-Z5~c7H5QPxJE2LPOEFPrqHlgHfBdcTPYOAOvpW~DaFSDsYzio3OtUXDQBaq1CX3V9UETTNRLFiBqBPij5wrqPi7471wxfSt3QIJAlMLYLtKSr0aBjWo94K6kdV796HpLXv1Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    id: "9",
    name: "Feedback form",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/2f96/68a3/47fe8534e8a03412b42bedb73577f013?Expires=1676246400&Signature=Xt3OJeM81TOrjbFbVFtaeI39ZY1bMvdOe3DyvEjysv3GHjtqU5qpW9KmaqxiKMHaXDhjeXT-6Qf2jWTVDZtxbziJzivNWMUBgEWnyy~6QSv~l6Ov0iQwO4tylpYVTM~HxgRJrpf4XzRvFKDs0~rULHjlvYpMi0IPOI87UcM9z7mkVEPdvleN2WaPzXJDQvOZx1hDOZi9EqcjXzBhyF0aN2AT4ZYjJhh7KxthRfnjXVyU37Ffw5L0viTX55ueofZJ1YNoGeTDognQJ7-~igBbe8Ue1B6mlHHNKMNReL6gqIKwXzTXQX0~RjgqDsqn2dmeuWIj~Irvh3jGsQ3ypWkiog__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    id: "10",
    name: "Book your tour",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/book-your-tour.png' />",
  },
  {
    id: "11",
    name: "build a pizza",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/03bf/2166/efa57dbd15cdbce947e22a5970ce545c?Expires=1676246400&Signature=MHa5fVX5LwahnZjT~12scT8GE7QRGV141P-sehU05C6bXL9jyih2K~t4ED45YMix-5TYfCWJtMZVefFoyb4w2AI4BRe~0pdRY64-R638Nr2b38w-8-MYoWTgRVbdaxWcYT1CZf658MICP8mwEeDnE5fkH6eokRj-g9YbtjjTatHOOxy8ehpazh~pAtijLpIhCvuhkOd~WsPFVoLtOqNevHQr7TodQTavJypPSALer6fIzVIvjxWygoa5Q5qFz4jxNfIlF5Twzlz0gNRbVow6T3OAa5gg1xbLNwtoGcUaOD6E~2c9UD0JA5QSWWr~sx57Ro0TurrIqr5hMjK6WXOqtQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
];

const dataNewForm = [
  {
    id: "Form-1",
    name: "Form-1",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form1.png' />",
  },
  {
    id: "Form-2",
    name: "Form-2",
    data: "<img alt='' width='100%' height='100%' src='img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/03bf/2166/efa57dbd15cdbce947e22a5970ce545c?Expires=1675036800&Signature=d4UZHUCJqmI0~BkvjTJrEOe4t3ksgavquR49IaTeyhGQy8NeRWwFQE6ZgAmfFaqXd05q8Q79EUKgrFUh7cv0jirR8G~HWfPrAGx2RlQAb98Cm4oMQ8JRoIuEXYeW6sT27HnYloiSIsSOJzGZZ0ztYXsL70BMjunNPoCIQxWKQaSvblJML2rETbaPkwQbp9csGJ6yUbd~TAtVrUodCvGJYvToxKVWoavPuZDq4-HziuxwBlYZxV1aDC9hHwcylE9WuWcnizB7eL7nBfdf3vzCLjvfWQcC6QR3U38xgvAyXC2ysJ7cF0CdqqLgNJB4tQcIOMWF0YUp9MMsU~SB3I9lEg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
];

module.exports = {
  dataFormTemplate,
  dataNewForm,
};
