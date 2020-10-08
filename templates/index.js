module.exports = (orders,order_items,sellerData,buyerData) => {
  const today = new Date();
  console.log('inside index',sellerData)
  const datee = new Date(orders.date);
  const i_date =datee.toLocaleDateString('en-GB') 

  const rows = order_items.map((oi,i)=>
   `  <tr>
      <td class="service">${++i}</td>
      <td class="desc">${oi.prdtname}</td>
      <td class="unit">${oi.price}</td>
      <td class="qty">${oi.offer}</td>
      <td class="unit">${oi.qty}</td>
      <td class="total">${oi.total}</td>
    </tr>`
  )
return `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <style>
      @font-face {
        font-family: SourceSansPro;
        src: url(SourceSansPro-Regular.ttf);
      }
      
      .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }
      
      a {
        color: #0087C3;
        text-decoration: none;
      }
      
      body {
        
        position: relative;
        width: 20cm;  
        height: 29cm; 
        margin: 20px 20px 20px 20px;
        color: #555555;
        background: #FFFFFF; 
        font-family: Arial, sans-serif; 
        font-size: 13px; 
      }
      
      header {
        padding: 10px 0;
        margin-bottom: 20px;
        border-bottom: 1px solid #AAAAAA;
      }
      
      #logo {
        float: left;
        margin-top: 8px;
      }
      
      #logo img {
        height: 70px;
      }
      
      #company {
        float: right;
        text-align: right;
      }
      
      
      #details {
        margin-bottom: 50px;
      }
      
      #client {
        padding-left: 6px;
        border-left: 6px solid #0087C3;
        float: left;
      }
      
      #client .to {
        color: #777777;
      }
      
      h2.name {
        font-size: 1.4em;
        font-weight: normal;
        margin: 0;
      }
      
      #invoice {
        float: right;
        text-align: right;
      }
      
      #invoice h1 {
        color: #0087C3;
        font-size: 2.4em;
        line-height: 1em;
        font-weight: normal;
        margin: 0  0 10px 0;
      }
      
      #invoice .date {
        font-size: 1.1em;
        color: #777777;
      }
      
      table {
        width:100%;
        border-collapse: collapse;
        border-spacing: 0;
       
        margin-bottom: 20px;
      }
      
      table th,
      table td {
        padding: 20px;
        background: #EEEEEE;
        text-align: center;
        border-bottom: 1px solid #FFFFFF;
      }
      
      table th {
        white-space: nowrap;        
        font-weight: normal;
      }
      
      table td {
        text-align: right;
      }
      
      table td h3{
        color: #57B223;
        font-size: 1em;
        font-weight: normal;
        margin: 0 0 0.2em 0;
      }
      
      table .no {
        color: #FFFFFF;
        font-size: 1em;
        background: #57B223;
      }
      
      table .desc {
        text-align: left;
      }
      
      table .unit {
        background: #DDDDDD;
      }
      
      table .qty {
      }
      
      table .total {
        background: #57B223;
        color: #FFFFFF;
      }
      
      table td.unit,
      table td.qty,
      table td.total {
        font-size: 1.2em;
      }
      
      table tbody tr:last-child td {
        border: none;
      }
      
      table tfoot td {
        padding: 10px 10px;
        background: #FFFFFF;
        border-bottom: none;
        font-size: 1em;
        white-space: nowrap; 
        border-top: 1px solid #AAAAAA; 
      }
      
      table tfoot tr:first-child td {
        border-top: none; 
      }
      
      table tfoot tr:last-child td {
        color: #57B223;
        font-size: 1em;
        border-top: 1px solid #57B223; 
      
      }
      
      table tfoot tr td:first-child {
        border: none;
      }
      
      #thanks{
        font-size: 1.5em;
        margin-bottom: 50px;
      }
      
      
      footer {
        color: #777777;
        width: 100%;
        height: 25px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #AAAAAA;
        padding: 5px 0;
        text-align: center;
      }
      
    
    </style>
  </head>
  <body style = "margin : 20px ,20px ,20px , 20px">
    <header class="clearfix">
      <div id="logo">
        <h1>Shop-In</h1>
      </div>
      <div id="invoice">
        <h2>OID : ${orders.oid} </h2>
        <div class="date">Invoice Date: ${i_date} </div>
        <div class="date">TransID:${orders.transid} </div>  
      </div>
     
      </div>
    </header>
    <main>
      <div id="details" class="clearfix">
        <div id="company">
        <div class="to">SELLER: </div>
          <h2 class="name">${sellerData.shop}</h2> 
          <div>${sellerData.street},${sellerData.city}</div>
          <div>${sellerData.state}-${sellerData.pin}</div>
          <div>GSTIN :${sellerData.gstnumber} </div>
         
        </div>
        
        <div id="client">
          <div class="to">INVOICE TO:</div>
          <h2 class="name">${buyerData.firstname}</h2>
          <div class="address">${buyerData.home},${buyerData.street},${buyerData.city}</div>
          <div class="address">${buyerData.po},${buyerData.state}-${buyerData.pin}</div>   
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th class="service">Sl.No</th>
            <th class="desc">DESCRIPTION</th>
            <th>PRICE</th>
            <th>Discount</th>
            <th>QTY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr>
            <td class="service"></td>
            <td class="desc">Shipping Charge</td>
            <td class="unit">$40.00</td>
            <td class="qty"></td>
            <td class="unit"></td>
            <td class="total">$800.00</td>
          </tr>
          <tr>
            <td class="service"></td>
            <td class="desc">Extra Discount</td>
            <td class="unit">$40.00</td>
            <td class="qty"></td>
            <td class="unit"></td>
            <td class="total">$160.00</td>
          </tr>
          <tr>
            <td colspan="5">SUBTOTAL</td>
            <td class="total">${orders.subtotal}</td>
          </tr>
          <tr>
            <td colspan="5">Discount</td>
            <td class="total">${orders.disc}</td>
          </tr>
          <tr>
            <td colspan="5">Total TAX</td>
            <td class="total">${orders.tax}</td>
          </tr>
          <tr>
            <td colspan="5" class="grand total">GRAND TOTAL</td>
            <td class="grand total">${orders.total}</td>
          </tr>
        </tbody>
      </table>
      <div id="thanks">Thank you for Choosing Shop-In!</div>
      
    </main>
    <footer>
    This Invoice was created on a computer and is valid without the signature and seal.<br/>
      ***printed on: ${today}***
    </footer>
  </body>
</html>
`;
};