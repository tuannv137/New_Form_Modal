const defaultForm = {
  name: "Contact form 1",
  data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form1.png' />",
};

const dataFormTemplate = [
  {
    name: "Contact form 1",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form1.png' />",
  },
  {
    name: "Contact form 2",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form2.png' />",
  },
  {
    name: "Contact form 3",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form3.png' />",
  },
  {
    name: "Contact form 4",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form4.png' />",
  },
  {
    name: "Newsletter form",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/b2b5/9448/511324dbf69922eeb3e247b5fd53783b?Expires=1676246400&Signature=i0wZg1ZcNip7RbekxErFwcUXBSacA2Apjwds9RyiV3sfPPpJoeWZ1gtE6SDA5nAIh2EuvZW7WAcnt~xekBn8WeeW5GntX2LU5vbBKaaZGDoB0TSvIAxsSDVketjGkBpLwvwpbpiXb0V-5u4QL1M-BP83bqOif6KgIoMQ~0cf4062xzfrcxLGzIH~WgvH~jZ6gPGVLVKDIM1n38tnzD8lzvxBGly9E1IrAJaILx7UHrT2qCesYWcieVPGW7HCs68OxJIANDVKisjwMSbgusu5kZBcd1RCa0fdQJo4coDbHI9gd2mxSEdmwj0PJ61bPXcT5aczmb85K4j8qLE5h7npQg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    name: "Servey form",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/d811/045e/4a5f146da5c9770ff192becbebb52a2c?Expires=1676246400&Signature=i8L7IA69j~YLkK6A6HEDkDdxbrxXdLzJVRcjCAIZzmuGPJQSwi0UHlk6V4TVQprLWSDw8FW9gmvMrqTa3Pf4Fr6b5fPXNQNm3OXLy9xpoIeX8ynDok4qK9Kw8Zp3rLqEWgWKvE8ey7lJSMNKH1e7VApr4og--VtIwWGm-Ys~E7HYHtmXI7PdexK~hEQU9N9d1LOsqJYby~E7Qlpi91AUHP5Syi9l5NGAo1Yz6t5UhUHvkD8mzPddREaQ29Yi0kP-3u7uMwH8nDNpEibXQ51aIhsVf-Vcg~nGs1BNEV6-eIlGrGuS3yV3qliQKKElqKwkbw4vviSlzR2KaKb-xIgDew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    name: "Online Booking Form",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/online-booking-form.png' />",
  },
  {
    name: "Customer Satisfaction Survey",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/customer-satisfaction-survey.png' />",
  },
  {
    name: "IT Service Request Form",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/it-service-request-form.png' />",
  },
  {
    name: "Booking form",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/c064/4e96/bef70469d334a33138ee24ea14c75fdb?Expires=1676246400&Signature=iDeHSYr4x3KKJCSEem3W3~GkPREidlz80r7WMm8AZtL3ubG2elTWTrMEP7iaCpovd0YSFmeLGjqIeTe3tAcX5jnxMyaV20Rjt7KWhG6PhjYSs0~lnTlvJhFtr--ucpnYJ5CXZuD8MdhV5ViAitbkc0LTJjdEEGFhrl-zvyph3tcqMIe-4dQ6eLebze4Z9Pad2FwyPQ1v46MaoAJX2n1JVjysLSCMUqtGVEDdeLCNjnDqk4c7uXT-Lhe6XtbG3XcTKBNX5hxqRRPGG3pxiQ8sm9f4fWj3-yOx41DhyWvhpGZSL8jyWGr~5H9~yvhfPssRsGoFIdw8ppo2JlVHDTjwAg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    name: "Request for quote",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/fa92/7aff/085ad981bce012130f7ffaea960c2de4?Expires=1676246400&Signature=G4FIPGvQT1eoW7JUL8ZpTmOo-b7cwan2QAXygir6xK6eQCH~eIbCearU58lOWxLEUc5js2uXby23lHNu6DSPb8MfcjfesS6sFa-2czgc7NvPpoJg6oU~L82Gm9SdpkIUdXkOdA6iym62TEmWoWljlu3KuRlaajxAB1EtwzEPta1Dc9ovaSusfdbJ4hG6iQfZ3XoQ6wykddx5YRxgy-Z5~c7H5QPxJE2LPOEFPrqHlgHfBdcTPYOAOvpW~DaFSDsYzio3OtUXDQBaq1CX3V9UETTNRLFiBqBPij5wrqPi7471wxfSt3QIJAlMLYLtKSr0aBjWo94K6kdV796HpLXv1Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    name: "Feedback form",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/2f96/68a3/47fe8534e8a03412b42bedb73577f013?Expires=1676246400&Signature=Xt3OJeM81TOrjbFbVFtaeI39ZY1bMvdOe3DyvEjysv3GHjtqU5qpW9KmaqxiKMHaXDhjeXT-6Qf2jWTVDZtxbziJzivNWMUBgEWnyy~6QSv~l6Ov0iQwO4tylpYVTM~HxgRJrpf4XzRvFKDs0~rULHjlvYpMi0IPOI87UcM9z7mkVEPdvleN2WaPzXJDQvOZx1hDOZi9EqcjXzBhyF0aN2AT4ZYjJhh7KxthRfnjXVyU37Ffw5L0viTX55ueofZJ1YNoGeTDognQJ7-~igBbe8Ue1B6mlHHNKMNReL6gqIKwXzTXQX0~RjgqDsqn2dmeuWIj~Irvh3jGsQ3ypWkiog__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
  {
    name: "Book your tour",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/book-your-tour.png' />",
  },
  {
    name: "build a pizza",
    data: "<img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/03bf/2166/efa57dbd15cdbce947e22a5970ce545c?Expires=1676246400&Signature=MHa5fVX5LwahnZjT~12scT8GE7QRGV141P-sehU05C6bXL9jyih2K~t4ED45YMix-5TYfCWJtMZVefFoyb4w2AI4BRe~0pdRY64-R638Nr2b38w-8-MYoWTgRVbdaxWcYT1CZf658MICP8mwEeDnE5fkH6eokRj-g9YbtjjTatHOOxy8ehpazh~pAtijLpIhCvuhkOd~WsPFVoLtOqNevHQr7TodQTavJypPSALer6fIzVIvjxWygoa5Q5qFz4jxNfIlF5Twzlz0gNRbVow6T3OAa5gg1xbLNwtoGcUaOD6E~2c9UD0JA5QSWWr~sx57Ro0TurrIqr5hMjK6WXOqtQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
];

const dataNewForm = [
  {
    name: "Form-1",
    data: "<img alt='' width='100%' height='100%' src='https://www.magezon.com/productfile/blueformbuilder/templates/contact-form1.png' />",
  },
  {
    name: "Form-2",
    data: "<img alt='' width='100%' height='100%' src='img alt='' width='100%' height='100%' src='https://s3-alpha-sig.figma.com/img/03bf/2166/efa57dbd15cdbce947e22a5970ce545c?Expires=1675036800&Signature=d4UZHUCJqmI0~BkvjTJrEOe4t3ksgavquR49IaTeyhGQy8NeRWwFQE6ZgAmfFaqXd05q8Q79EUKgrFUh7cv0jirR8G~HWfPrAGx2RlQAb98Cm4oMQ8JRoIuEXYeW6sT27HnYloiSIsSOJzGZZ0ztYXsL70BMjunNPoCIQxWKQaSvblJML2rETbaPkwQbp9csGJ6yUbd~TAtVrUodCvGJYvToxKVWoavPuZDq4-HziuxwBlYZxV1aDC9hHwcylE9WuWcnizB7eL7nBfdf3vzCLjvfWQcC6QR3U38xgvAyXC2ysJ7cF0CdqqLgNJB4tQcIOMWF0YUp9MMsU~SB3I9lEg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />",
  },
];

module.exports = {
  dataFormTemplate,
  dataNewForm,
};
