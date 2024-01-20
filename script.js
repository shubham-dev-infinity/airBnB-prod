$(document).ready(function () {
    // $("body").on('input', '#interest_rate, #management_fees_amount, #occupancy, #rental-management_fees_amount,#rental-occupancy', function () {
    //     var inputElement = $(this)[0]; // Get the DOM element

    //     // Get the current cursor position
    //     var cursorPosition = inputElement.selectionStart;

    //     // Get the input value
    //     var inputValue = $(this).val();

    //     // Check if the value already ends with '%'
    //     if (!inputValue.endsWith('%')) {
    //         // Update the input value with '%' appended
    //         $(this).val(inputValue + '%');

    //         // Set the cursor position before the '%'
    //         inputElement.setSelectionRange(cursorPosition, cursorPosition);
    //     }
    // });
    $("body").on('input', '.amountInput', function () {
        var inputElement = this;
        var originalCursorPosition = inputElement.selectionStart;

        // Get the numeric value without non-numeric characters
        var numericValue = parseFloat($(this).val().replace(/[^0-9.-]/g, ''));

        // Check if the numeric value is NaN (not a number)
        if (isNaN(numericValue)) {
            // If NaN, set the input value to an empty string and exit the function
            $(this).val('');
            return;
        }
        // Get the input value before formatting
        var originalInputValue = $(this).val();

        // Format the numeric value with the '$' sign
        var formattedValue = '$' + numericValue.toLocaleString();

        // Check if the numeric value is 0 after deleting the first digit
        if (numericValue === 0 && originalInputValue.indexOf('0') === 1) {
            // Revert to the original input value and keep the cursor position
            $(this).val(originalInputValue);
            inputElement.setSelectionRange(originalCursorPosition, originalCursorPosition);
            return;
        }

        // Calculate the change in length due to formatting
        var lengthDiff = formattedValue.length - originalInputValue.length;

        // Update the input value
        $(this).val(formattedValue);

        // Calculate the new cursor position
        var newCursorPosition = originalCursorPosition + lengthDiff;

        // Set the cursor position after updating the input
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);

        totalCashRequired();
        updateDiscount();
        strSetupCost();
        loanEstablishedExpense();
        calculatePMT();
        loanExpenses();
        calculateRentalIncome();
        property();
        rental_StrSetupCost();
        rental_Income();
        property_Expenses();
        annualRepaymentAmount();
        rental_annualRepaymentAmount();

    });
    $("body").on('input', '.amountPercentage', function () {
        var inputElement = this;
        var originalCursorPosition = inputElement.selectionStart;

        // Get the numeric value without non-numeric characters
        var numericValue = parseFloat($(this).val().replace(/[^0-9.-]/g, ''));

        // Check if the numeric value is NaN (not a number)
        if (isNaN(numericValue)) {
            // If NaN, set the input value to an empty string and exit the function
            $(this).val('');
            return;
        }
        // Get the input value before formatting
        var originalInputValue = $(this).val();

        // Format the numeric value with the '$' sign
        var formattedValue = '%' + numericValue.toLocaleString();

        // Check if the numeric value is 0 after deleting the first digit
        if (numericValue === 0 && originalInputValue.indexOf('0') === 1) {
            // Revert to the original input value and keep the cursor position
            $(this).val(originalInputValue);
            inputElement.setSelectionRange(originalCursorPosition, originalCursorPosition);
            return;
        }

        // Calculate the change in length due to formatting
        var lengthDiff = formattedValue.length - originalInputValue.length;

        // Update the input value
        $(this).val(formattedValue);

        // Calculate the new cursor position
        var newCursorPosition = originalCursorPosition + lengthDiff;

        // Set the cursor position after updating the input
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);

        totalCashRequired();
        updateDiscount();
        strSetupCost();
        loanEstablishedExpense();
        calculatePMT();
        loanExpenses();
        calculateRentalIncome();
        property();
        rental_StrSetupCost();
        rental_Income();
        property_Expenses();
        annualRepaymentAmount();
        rental_annualRepaymentAmount();

    });
    function updateDiscount() {
        var marketValue = parseFloat($('#market-value').val().replace(/[^0-9.-]/g, '')) || 0;
        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        $('#widget-purchase-price').text('$' + purchasePrice.toLocaleString());
        if (marketValue > purchasePrice) {
            var discountAmount = marketValue - purchasePrice;
            var discountPercentage = marketValue !== 0 ? (discountAmount / marketValue) * 100 : 0;
            discountPercentage = (discountPercentage * 100) / 100;
            $('#discount-percent').text(discountPercentage.toFixed(2) + '%');
            discountAmount = (discountAmount * 100) / 100;
            $('#discount-price').text('$' + discountAmount.toLocaleString());
            $('.discount').show();
            $('.overprice').hide();
            $('#result-message').hide();
        } else if (marketValue < purchasePrice) {
            var overpricedAmount = purchasePrice - marketValue;
            var overpricedPercentage = marketValue !== 0 ? (overpricedAmount / marketValue) * 100 : 0;
            overpricedPercentage = (overpricedPercentage * 100) / 100;
            $('#overpriced-percent').text(overpricedPercentage.toFixed(2) + '%');
            overpricedAmount = (overpricedAmount * 100) / 100;
            $('#overpriced-price').text('$' + overpricedAmount.toLocaleString());
            $('.overprice').show();
            $('.discount').hide();
            $('#result-message').hide();
        }
        else {
            // Display a message in the else part with HTML
            $('#result-message').show();
            $('#result-message').html("<p>Purchasing at Market Price</p>");
            $('.overprice').hide();
            $('.discount').hide();
        }
    }
    var totalCash = 0;
    function totalCashRequired() {
        var downpayment = parseFloat($('#down-payment').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyImprovement = parseFloat($('#property-improvements').val().replace(/[^0-9.-]/g, '')) || 0;
        var legals = parseFloat($('#legals').val().replace(/[^0-9.-]/g, '')) || 0;
        var stampDutyCalculators = parseFloat($('#stamp-duty-calculator').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherCosts = parseFloat($('#other-costs').val().replace(/[^0-9.-]/g, '')) || 0;
        var buyerAgentFees = parseFloat($('#buyer-agent-fees').val().replace(/[^0-9.-]/g, '')) || 0;
        // var totalAmountLabel = document.querySelector('#total_renovation_cost');
        // var strSetupCost = parseFloat(totalAmountLabel.textContent.replace('$', '').replace(',', ''));
        var strSetupCost = totalStrCost;
        var totalCashRequired = downpayment + propertyImprovement + legals + stampDutyCalculators + otherCosts + buyerAgentFees + strSetupCost;
        totalCash = totalCashRequired;
        $('#str-setupCost').text('$' + strSetupCost.toLocaleString());
        $('#total-cash-required').text('$' + totalCashRequired.toLocaleString());
        $('#widget-cash-required').text('$' + totalCashRequired.toLocaleString());
    }
    var totalStrCost = 0
    function strSetupCost() {
        var furniture = parseFloat($('#furniture').val().replace(/[^0-9.-]/g, '')) || 0;
        var photographListingCost = parseFloat($('#photograph-Listing-Cost').val().replace(/[^0-9.-]/g, '')) || 0;
        var security = parseFloat($('#security').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherStrCost = parseFloat($('#other-str-cost').val().replace(/[^0-9.-]/g, '')) || 0;
        totalStrCost = furniture + photographListingCost + security + otherStrCost;
        $('#total_renovation_cost').text('$' + totalStrCost.toLocaleString());
    }
    var totalPurchasePrice = 0;
    var totalExpensesAmount = 0;
    function loanEstablishedExpense() {
        var loanEstablishedFees = parseFloat($('#loan-establishment-fee').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyValuation = parseFloat($('#property-valuation').val().replace(/[^0-9.-]/g, '')) || 0;
        var lenderMortgageInsurance = parseFloat($('#lender-mortgage-insurance').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherLoanCosts = parseFloat($('#other-loan-costs').val().replace(/[^0-9.-]/g, '')) || 0;
        totalExpensesAmount = loanEstablishedFees + propertyValuation + lenderMortgageInsurance + otherLoanCosts;
        $('#total-expenses-amount').text('$' + totalExpensesAmount.toLocaleString());
        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyImprovement = parseFloat($('#property-improvements').val().replace(/[^0-9.-]/g, '')) || 0;
        var legals = parseFloat($('#legals').val().replace(/[^0-9.-]/g, '')) || 0;
        var stampDutyCalculators = parseFloat($('#stamp-duty-calculator').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherCosts = parseFloat($('#other-costs').val().replace(/[^0-9.-]/g, '')) || 0;
        var buyerAgentFees = parseFloat($('#buyer-agent-fees').val().replace(/[^0-9.-]/g, '')) || 0;
        // var totalAmountLabel = document.querySelector('#total_renovation_cost');
        // var strSetupCost = parseFloat(totalAmountLabel.textContent.replace('$', '').replace(',', ''));
        var total = purchasePrice + propertyImprovement + legals + stampDutyCalculators + otherCosts + buyerAgentFees;
        totalPurchasePrice = totalExpensesAmount + total;
        console.log(totalPurchasePrice);
        $('#total-purchasePrice').text('$' + totalPurchasePrice.toLocaleString());
    }
    var total = 0;
    function annualPropertyExpenses() {
        var rate_amount = parseFloat($('#rate_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var building_insurance_amount = parseFloat($('#building_insurance_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var landlord_insurance_amount = parseFloat($('#landlord_insurance_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var strata_fees_amount = parseFloat($('#strata_fees_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var land_tax_amount = parseFloat($('#land_tax_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var maintenance_amount = parseFloat($('#maintenance_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        
        var management_fees_rate = parseFloat($('#management_fees_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var amount = grossAnnualRent * management_fees_rate * 0.01;
        if (isNaN(amount)) {
            $('#management_fees').text('$0');
        } else {
            $('#management_fees').text('$' + Math.round(amount).toLocaleString());
        }


        var water = parseFloat($('#water').val().replace(/[^0-9.-]/g, '')) || 0;
        var electricity = parseFloat($('#electricity').val().replace(/[^0-9.-]/g, '')) || 0;
        var internet = parseFloat($('#internet').val().replace(/[^0-9.-]/g, '')) || 0;
        var booking_software = parseFloat($('#booking-software').val().replace(/[^0-9.-]/g, '')) || 0;
        var consumables = parseFloat($('#consumables').val().replace(/[^0-9.-]/g, '')) || 0;
        var gifts = parseFloat($('#gifts').val().replace(/[^0-9.-]/g, '')) || 0;
        var others = parseFloat($('#others').val().replace(/[^0-9.-]/g, '')) || 0;
        total = rate_amount + building_insurance_amount + landlord_insurance_amount + strata_fees_amount + land_tax_amount + maintenance_amount + amount + water + electricity + internet + booking_software + consumables + gifts + others;
        console.log({ rate_amount, building_insurance_amount, landlord_insurance_amount, others, gifts, consumables, booking_software, internet, electricity, water, maintenance_amount, land_tax_amount, strata_fees_amount }, 'total');
        if (isNaN(total)) {
            $('#total-amount').text('$0');
        } else {
            $('#total-amount').text('$' + Math.round(total).toLocaleString());
        }

    }
    function calculatePMT(annualRate, loanTerm, principal) {
        var monthlyRate = annualRate / 12 / 100;
        console.log('monthly rate:', monthlyRate);
        var numberOfPayments = loanTerm * 12;
        var pmt = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        if (!isNaN(parseFloat(pmt)) && isFinite(pmt)) {
            console.log('pmt:', pmt);
            return pmt;
        } else {
            console.log('Invalid result for PMT calculation');
            return '0';
        }
    }
    var pi_amount = 0;
    var io_amount = 0;
    async function loanExpenses() {
        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        var downpayment = parseFloat($('#down-payment').val().replace(/[^0-9.-]/g, '')) || 0;
        // var totalExpensesAmount = document.querySelector('#total-expenses-amount');
        // var loanTotalExpense = parseFloat(totalExpensesAmount.textContent.replace('$', '').replace(',', ''));
        var loanTotalExpense = totalExpensesAmount;
        var totalFundBorrowed = purchasePrice - downpayment + loanTotalExpense;
        $('#fund-borrowed-amount').text('$' + totalFundBorrowed.toLocaleString());
        var interestRate = parseFloat($('#interest_rate').val().replace(/[^0-9.-]/g, '')) || 0;
        var loanTerm = 30;
        var monthlyRepayments = calculatePMT(interestRate, loanTerm, totalFundBorrowed);
        $('#monthly-repayment-amount').text('$' + Math.round(monthlyRepayments).toLocaleString());
        var annualRepayments = monthlyRepayments * 12;
        $('#annual-repayment-amount').text('$' + Math.round(annualRepayments).toLocaleString());
        var annualInterest = totalFundBorrowed * interestRate * 0.01;
        $('#interest_annual_repayment_amount').text('$' + annualInterest.toLocaleString());
        var lvr = (totalFundBorrowed / purchasePrice) * 100;
        if (isNaN(lvr)) {
            $('#lvr_amount').text('0%');
        } else {
            $('#lvr_amount').text(lvr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        // var totalRepaymentAmount = document.querySelector('#total-amount');
        // var annualRepaymentExpenses = parseFloat(totalRepaymentAmount.textContent.replace('$', '').replace(',', ''));
        var annualRepaymentExpenses = total;
        pi_amount = annualRepayments + annualRepaymentExpenses;
        if (isNaN(pi_amount)) {
            $('#principle-interest-amount').text('$0');
        } else {
            $('#principle-interest-amount').text('$' + Math.round(pi_amount).toLocaleString());
        }

        io_amount = annualInterest + annualRepaymentExpenses;
        if (isNaN(io_amount)) {
            $('#interest-only-amount').text('$0');

            $('#widget-value-add').text('$0');
        } else {
            $('#interest-only-amount').text('$' + Math.round(io_amount).toLocaleString());
            $('#widget-value-add').text('$' + Math.round(io_amount).toLocaleString());
        }
    }

    var grossAnnualRent;
    function calculateRentalIncome() {
        var dailyRate = parseFloat($('#daily-rate').val().replace(/[^0-9.-]/g, '')) || 0;
        $('#widget-equity-io').text('$' + Math.round(dailyRate).toLocaleString());
        var occupancy_percent = parseFloat($('#occupancy').val().replace(/[^0-9.-]/g, '')) || 0;
        var annualizedRate = dailyRate * 365;
        grossAnnualRent = annualizedRate * occupancy_percent * 0.01;
        $('#purchased_annual_rent').text('$' + Math.round(grossAnnualRent).toLocaleString());
    }
    async function annualRepaymentAmount() {
        var occupancy_percent = parseFloat($('#occupancy').val().replace(/[^0-9.-]/g, '')) || 0;
        await new Promise(resolve => setTimeout(resolve, 500));

        // var amount = document.querySelector('#principle-interest-amount');
        // var pi_amount = parseFloat(amount.textContent.replace('$', '').replace(',', ''));
        // var amount_io = document.querySelector('#interest-only-amount');
        // var io_amount = parseFloat(amount_io.textContent.replace('$', '').replace(',', ''));
        var piAmount = grossAnnualRent - pi_amount;
        console.log("piAmount", piAmount);
        if (isNaN(piAmount)) {
            $('#asPurchased-p-i-amount').text('$0');
        } else {
            $('#asPurchased-p-i-amount').text('$' + Math.round(piAmount).toLocaleString());
            $('#widget-renovation-cost').text('$' + Math.round(piAmount).toLocaleString());
        }
        var ioAmount = grossAnnualRent - io_amount;
        console.log(ioAmount, 'ioAmoount');
        if (isNaN(ioAmount)) {
            $('#asPurchased-ioAmount').text('$0');

        } else {
            $('#asPurchased-ioAmount').text('$' + Math.round(ioAmount).toLocaleString());
        }

        $('#profit-text').text(Math.round(occupancy_percent).toLocaleString() + '%');
        $('#widget-rental-increase').text(occupancy_percent.toLocaleString() + '%');

    }
    //--------------- AirBnB (Rental Model) --------------  //
    var annual_rent = 0;
    function property() {
        var weekly_rent = parseFloat($('#week-rent')?.val()?.replace(/[^0-9.-]/g, '')) || 0;
        // console.log("weekly_rent :", weekly_rent);
        annual_rent = Math.round(weekly_rent * 52);
        $('#week-weekly-rent').text('$' + annual_rent.toLocaleString());
        $('#rent').text('$' + annual_rent.toLocaleString());
        $('#rental-widget-purchase-price').text('$' + annual_rent.toLocaleString());

    }

    function rental_StrSetupCost() {
        var rentalFurniture = parseFloat($('#rental-furniture').val().replace(/[^0-9.-]/g, '')) || 0;
        var rentalPhotographListingCost = parseFloat($('#rental-photograph-Listing-Cost').val().replace(/[^0-9.-]/g, '')) || 0;
        var rentalSecurity = parseFloat($('#rental-security').val().replace(/[^0-9.-]/g, '')) || 0;
        var rentalOtherCost = parseFloat($('#rental-other-str-cost').val().replace(/[^0-9.-]/g, '')) || 0;
        var totalRentalStrCost = rentalFurniture + rentalPhotographListingCost + rentalSecurity + rentalOtherCost;
        $('#rental-total_renovation_cost').text('$' + totalRentalStrCost.toLocaleString());
        $('#rental-widget-cash-required').text('$' + totalRentalStrCost.toLocaleString());
    }
    var rental_grossAnnualRent = 0;
    async function rental_Income() {
        await new Promise(resolve => setTimeout(resolve, 500));
        var rentalDailyRate = parseFloat($('#rental_daily_rate').val().replace(/[^0-9.-]/g, '')) || 0;
        $('#rental-widget-equity-io').text('$' + rentalDailyRate.toLocaleString());
        var occupancy = parseFloat($('#rental-occupancy').val().replace(/[^0-9.-]/g, '')) || 0;
        $('#rental-widget-occupancy').text(occupancy.toLocaleString() + '%');
        var rental_annualizedRate = rentalDailyRate * 365;
        console.log('rental_annualizedRate :', rental_annualizedRate);
        rental_grossAnnualRent = rental_annualizedRate * occupancy * 0.01;
        $('#rental_purchased_annual_rent').text('$' + Math.round(rental_grossAnnualRent).toLocaleString());

    }

    var totalAnnualExpenses = 0;
    async function property_Expenses() {
        var insurance = parseFloat($('#insurance').val().replace(/[^0-9.-]/g, '')) || 0;
        var maintenanceAmount = parseFloat($('#rental-maintenance_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        await new Promise(resolve => setTimeout(resolve, 500));

        var managementFees = parseFloat($('#rental-management_fees_amount').val()) || 0;
        if (isNaN(rental_grossAnnualRent)) {
            $('#rental_management_fees').text('$0');
        } else {
            $('#rental_management_fees').text('$' + Math.round((rental_grossAnnualRent * managementFees) / 100).toLocaleString()); //
        }

        // $('#rental_management_fees').text('$' + Math.round((rental_grossAnnualRent * managementFees) / 100).toLocaleString()); //

        var rentalManagement_fees = (rental_grossAnnualRent * managementFees) / 100;
        console.log("rentalManagement_fees", rentalManagement_fees);
        var rentalWater = parseFloat($('#rental-water').val().replace(/[^0-9.-]/g, '')) || 0;
        var rentalElectricity = parseFloat($('#rental-electricity').val().replace(/[^0-9.-]/g, '')) || 0;
        var rentalInternet = parseFloat($('#rental-internet').val().replace(/[^0-9.-]/g, '')) || 0;
        var rentalBookingSoftware = parseFloat($('#rental-booking-software').val().replace(/[^0-9.-]/g, '')) || 0;
        var rentalConsumable = parseFloat($('#rental-consumables').val().replace(/[^0-9.-]/g, '')) || 0;
        var rentalGifts = parseFloat($('#rental-gifts').val().replace(/[^0-9.-]/g, '')) || 0;
        var rentalOther = parseFloat($('#rental-others').val().replace(/[^0-9.-]/g, '')) || 0;

        totalAnnualExpenses = rentalManagement_fees + insurance + maintenanceAmount + rentalWater +
            rentalElectricity + rentalInternet + rentalBookingSoftware + rentalConsumable + rentalGifts +
            rentalOther + annual_rent;
        console.log("totalAnnualExpenses", totalAnnualExpenses);

        if (isNaN(rental_grossAnnualRent)) {
            $('#rental-total-purchasePrice').text('$0');
        } else {
            $('#rental-total-purchasePrice').text('$' + Math.round(totalAnnualExpenses).toLocaleString());

            $('#rental-widget-value-add').text('$' + Math.round(totalAnnualExpenses).toLocaleString());
        }

        // $('#rental-total-purchasePrice').text('$' +  Math.round(totalAnnualExpenses).toLocaleString());


    }
    async function rental_annualRepaymentAmount() {
        var occupancy_percent = parseFloat($('#rental-occupancy').val().replace(/[^0-9.-]/g, '')) || 0;
        await new Promise(resolve => setTimeout(resolve, 500));
        // var rental_annualRent = document.querySelector('#rental_purchased_annual_rent');
        // var rental_Rent = parseFloat(rental_annualRent.textContent.replace(/[^0-9.-]/g, ''));
        var rental_Rent = rental_grossAnnualRent;
        // var rental_purchasePrice = document.querySelector('#rental-total-purchasePrice');
        // var rental_purchaseAmount = parseFloat(rental_purchasePrice.textContent.replace(/[^0-9.-]/g, ''));
        var rental_purchaseAmount = totalAnnualExpenses;
        var net_Profit = rental_Rent - rental_purchaseAmount;
        if (isNaN(net_Profit)) {
            $('#rental-net-profit').text('$0');
        } else {
            $('#rental-net-profit').text('$' + Math.round(net_Profit).toLocaleString());
            $('#rental-widget-renovation-cost').text('$' + Math.round(net_Profit).toLocaleString());
        }

        $('#rental-profit-text').text(Math.round(occupancy_percent).toLocaleString() + '%');
    }

    $('#purchase_Tab').click(function () {
        $('#rental_Tab').removeClass('model_Tab_Btn_Active');
        $(this).addClass('model_Tab_Btn_Active');
        $('#airbnb_Purchase_Model').addClass('show_Model');
        $('#airbnb_Rental_Model').removeClass('show_Model');
    });

    $('#rental_Tab').click(function () {
        $('#purchase_Tab').removeClass('model_Tab_Btn_Active');
        $(this).addClass('model_Tab_Btn_Active');
        $('#airbnb_Purchase_Model').removeClass('show_Model');
        $('#airbnb_Rental_Model').addClass('show_Model');
    });

    $('#nav_Bars').click(function () {
        $('body').css('overflow', 'hidden');
        $('#sidebar-container').addClass('give_Full_Width');
        $('#layoutSidenav_nav').addClass('give_Width_350');
    })
    $('#close_Nav_Button').click(function () {
        $('body').css('overflow', 'auto');
        $('#sidebar-container').removeClass('give_Full_Width');
        $('#layoutSidenav_nav').removeClass('give_Width_350');
    })
    var currentUrl = window.location.href;

    // Iterate through each link and compare its href with the current URL
    $('#layoutSidenav_nav a').each(function () {
        var linkUrl = $(this).attr('href');

        // Check if the link's href matches the current URL
        if (currentUrl.indexOf(linkUrl) !== -1) {
            // Add the "activeLink" class to the matching link
            $(this).addClass('activeLink');
        }
    });

    $('#purchase-price').on('input', function () {

        updateDiscount();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();

    });
    $('#market-value').on('input', function () {

        updateDiscount();

    });
    $('#down-payment').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();

    });
    $('#property-improvements').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        annualRepaymentAmount();

    });

    $('#furniture').on('input', function () {

        strSetupCost();
        totalCashRequired();
        loanEstablishedExpense();
        annualRepaymentAmount();

    });
    $('#photograph-Listing-Cost').on('input', function () {

        strSetupCost();
        totalCashRequired();
        loanEstablishedExpense();
        annualRepaymentAmount();

    });
    $('#security').on('input', function () {

        totalCashRequired();
        strSetupCost();
        loanEstablishedExpense();
        annualRepaymentAmount();

    });
    $('#other-str-cost').on('input', function () {

        totalCashRequired();
        strSetupCost();
        loanEstablishedExpense();
        annualRepaymentAmount();

    });

    $('#legals').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();
    });

    $('#stamp-duty-calculator').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();
    });

    $('#other-costs').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();
    });
    $('#buyer-agent-fees').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();
    });
    $('#property-valuation').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();

    });
    $('#loan-establishment-fee').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();

    });
    $('#lender-mortgage-insurance').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();

    });
    $('#other-loan-costs').on('input', function () {

        totalCashRequired();
        loanEstablishedExpense();
        loanExpenses();
        annualRepaymentAmount();

    });

    // --------Annual Property Expenses-------//

    $('#rate_amount').on('input', function () {
        console.log('amount');
        annualPropertyExpenses();
        annualRepaymentAmount();

    });
    $('#building_insurance_amount').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });
    $('#landlord_insurance_amount').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });

    $('#strata_fees_amount').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });
    $('#land_tax_amount').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });
    $('#maintenance_amount').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });

    $('#management_fees_amount').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
        loanExpenses();
    });
    $('#water').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });
    $('#electricity').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });
    $('#internet').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });

    $('#booking-software').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });
    $('#consumables').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });
    $('#gifts').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });
    $('#others').on('input', function () {

        annualPropertyExpenses();
        annualRepaymentAmount();
    });
    $('#interest_rate').on('input', function () {
        calculateRentalIncome();
        loanExpenses();
        annualRepaymentAmount();

    });
    $('#occupancy').on('input', function () {
        calculateRentalIncome();
        loanExpenses();
        annualPropertyExpenses();
        annualRepaymentAmount();

    });
    $('#daily-rate').on('input', function () {
        calculateRentalIncome();
        loanExpenses();
        annualPropertyExpenses();
        annualRepaymentAmount();

    });
    // -------rental-mode-----//

    $('#week-rent').on('input', function () {
        property();
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-furniture').on('input', function () {
        rental_StrSetupCost();
        rental_annualRepaymentAmount();
    });
    $('#rental-photograph-Listing-Cost').on('input', function () {
        rental_StrSetupCost();
        rental_annualRepaymentAmount();
    });
    $('#rental-security').on('input', function () {
        rental_StrSetupCost();
        rental_annualRepaymentAmount();
    });
    $('#rental-other-str-cost').on('input', function () {
        rental_StrSetupCost();
        rental_annualRepaymentAmount();
    });
    $('#insurance').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-maintenance_amount').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-management_fees_amount').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-water').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-electricity').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-internet').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-booking-software').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-consumables').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-gifts').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-others').on('input', function () {
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rent').on('input', function () {
        property();
        property_Expenses();
    });
    $('#rental_daily_rate').on('input', function () {
        rental_Income();
        property_Expenses();
        rental_annualRepaymentAmount();
    });
    $('#rental-occupancy').on('input', function () {
        rental_Income();
        property_Expenses();
        rental_annualRepaymentAmount();
    });



    updateDiscount();
    strSetupCost();
    totalCashRequired();
    loanEstablishedExpense();
    annualPropertyExpenses();
    calculateRentalIncome();
    loanExpenses();
    annualRepaymentAmount();
    property();
    rental_StrSetupCost();
    rental_Income();
    property_Expenses();
    rental_annualRepaymentAmount();
});