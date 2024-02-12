$('.minus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }

$input.val(value);

});

$('.plus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value < 100) {
      value = value + 1;
    } else {
        value =100;
    }

    $input.val(value);
});

$('.like-btn').on('click', function() {
$(this).toggleClass('is-active');
});


    var button = document.getElementById("purchase_Btn"); 
    button.addEventListener("click", function() { 
    // Single instance on page.
  var razorpay = new Razorpay({
    key: 'rzp_test_boNL9IDDOnRh8t',
    // logo, displayed in the payment processing popup
    image: 'https://i.imgur.com/n5tjHFD.png',
  });

  // Fetching the payment.
  razorpay.once('ready', function(response) {
    console.log(response.methods);
  });

  // Submitting the data.
  var data = {
    amount: 1000, // in currency subunits. Here 1000 = 1000 paise, which equals to ₹10
    currency: "INR", // Default is INR. We support more than 90 currencies.
    email: 'test.appmomos@gmail.com',
    contact: '8341220820',
    notes: {
      address: 'Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru',
    },
    // order_id: '123',
    method: 'netbanking',
    // method specific fields
    bank: 'HDFC'
  };

  $("#razorGateway").click(function() {
    alert("Payment clicked");
    // has to be placed within a user-initiated context, such as click, in order for popup to open.
    razorpay.createPayment(data);

    razorpay.on('payment.success', function(resp) {
      alert("Payment success.");
      alert(resp.razorpay_payment_id);
      alert(resp.razorpay_order_id);
      alert(resp.razorpay_signature);
    }); // will pass payment ID, order ID, and Razorpay signature to success handler.

    razorpay.on('payment.error', function(resp) {
      alert(resp.error.description);
    }); // will pass error object to error handler
  });
  });


    
