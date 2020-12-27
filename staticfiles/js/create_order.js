// Add product to an order when product button is clicked
$(document).on('click', '.product-butt', function () {

    var order_item_id = $(this).data('id') // Get Item Id
    var order_item_name = $(this).data('name') // Get Item Name
    var order_item_price = $(this).data('price') // Get Item Price
    var exist = check_if_exist(order_item_name) // Check if item is already in the order

    // Calculate the price for an item 
    var order_item_quantity = 1;
    var product_total = (order_item_price * order_item_quantity).toFixed(2)

    // If an item doesn't exist in the order, add the item 
    if (exist == -1) {
        var product_details = '' +
            '<tr id=' + TOTAL_ITEMS + '> \
                                <td class="product-name">' + order_item_name + '</td> \
                                <td class="minus"><button class="minus"><i class="fas fa-minus"></i></button></td> \
                                <td class="product-quantity">'+ order_item_quantity + '</td> \
                                <td class="plus"><button class="plus"><i class="fas fa-plus"></i></button></td> \
                                <td class="product-unit-price">£<span>' + order_item_price + '</span></td> \
                                <td class="product-total-price">£<span>'+ product_total + '</span></td> \
                            </tr>'

        $('.order-product-list-table-body').append($(product_details))
        TOTAL_ITEMS++;
    }
    // Else, change the item quantity and item total price
    else {
        var row_num = exist; // Get the row number of the item that exists 
        var number_as_int = parseInt($('tr#' + row_num + ' td.product-quantity').html()) // Current num of ordered items
        var quantity = number_as_int + 1; // increment the item counter + 1
        $('tr#' + row_num + ' td.product-quantity').html(quantity)                // Update the item counter for an item
        var price_as_number = parseFloat($('tr#' + row_num + ' td.product-unit-price span').html()) // Get the item unit price 
        var total_price = (price_as_number * quantity).toFixed(2);
        $('tr#' + row_num + ' td.product-total-price span').html(total_price)
    }
    updateScroll()
    keep_track_of_total_price()
    
})

// checks if an item is already in the item list
function check_if_exist(order_item_name) {

    var names = document.getElementsByClassName('product-name')
    for (var i = 0; i < names.length; i++)if (names.item(i).innerHTML.toUpperCase() == order_item_name.toUpperCase()) return i;
    return -1;
}

// Update pay button and financial order information
function keep_track_of_total_price() {
    var new_total = 0;
    new_total = new_total + get_total_price_of_order()
    var tax = 0;
    if ($('.order-type').html() == "Have In") tax = calculate_tax(new_total)
    var button_total = new_total + tax
    new_total = new_total.toFixed(2)
    tax = tax.toFixed(2)
    $('.total-amount-row2 .amount span').text(new_total)
    $('.total-amount-row4 .amount span').text(tax)
    $('.pay-button button span').html(button_total.toFixed(2)) // This should be after tax 
    $('.price-total').children('span').html(button_total.toFixed(2))

}
// Calculates tax/ Tax could be changed from the EPOS template (index.html)
function calculate_tax(total) {
    return TAX * total
}
// Loops through each table row and calculates the total price of all items
function get_total_price_of_order() {
    var initial_total = 0
    var total_price = document.getElementsByClassName('product-total-price')

    for (var i = 0; i < total_price.length; i++) {
        var row_total_string = $(total_price.item(i)).text().slice(1);
        var row_total = parseFloat(row_total_string)
        initial_total = initial_total + row_total
    }
    return initial_total;
}

// Removes an item from the item list 
$(document).on('click', '.fa-minus', function () {

    var current_item = $(this).parent().parent().parent()
    var current_item_number = $(current_item).children('.product-quantity').html()

    if (current_item_number == 1) {
        $(current_item).remove() // Remove item from order if it's only one in the order
        TOTAL_ITEMS = TOTAL_ITEMS -1; // Update the number of the total items in the order
        keep_track_of_total_price()  // Update pay button and financial order information
    }
    else {  
        current_item_number = current_item_number - 1; // Subtract 1 from current product count 
        $(current_item).children('.product-quantity').html(current_item_number) // Update product count with the new count (product count - 1)

        var item_unit_price =  parseFloat($(current_item).children('.product-unit-price').children('span').html()) // Get the the price of single item
        
        var price_item_total = 0                                                                          
        price_item_total = item_unit_price*current_item_number      // Calculate price for all of the same items
        price_item_total = price_item_total.toFixed(2)              // Make it two decimal places
        
        $(current_item).children('.product-total-price').children('span').html(price_item_total)  // Update the total price for the same item
       keep_track_of_total_price() // Update pay button and financial order information
       
    }
    updateScroll()
})
// Add button handler
$(document).on('click', '.fa-plus', function(){
    var current_item = $(this).parent().parent().parent()
    var current_item_name = $(current_item).children('.product-name').html()
    var button = $('button[data-name="'+current_item_name+'"]')
    button.click()
})

// Scroll to the last item in the item list 
function updateScroll() {
    var last_row = $(".order-product-list-table tr:last")[0]
    last_row.scrollIntoView();
}