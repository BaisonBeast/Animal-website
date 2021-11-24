$(document).ready(function(){

  //Search Bar toggle
  $('#search-icon').click(function(){
    $(this).toggleClass('fa-times');
    $('#search-box').toggleClass('active');
  });

  $('#menu').click(function(){
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load',function(){

    $('#search-icon').removeClass('fa-times');
    $('#search-box').removeClass('active');

    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if($(window).scrollTop() > 0){
      $('header').addClass('sticky');
    }else{
      $('header').removeClass('sticky');
    }
  });
  //---------------------------------------------------------------------------------------

  // Setting the item value for cart
  let no=0;
  let total=0;
  JSON.parse(localStorage.getItem("items")).map(data=>{
    no+=data.no;
    total+=parseInt(data.price);
  });
  $(".item_count").html(no);
  $(".total").html(total);
  //---------------------------------------------------------------------------------------

  //Cart pop-up
  $(".fa-shopping-cart").on('click', () => {
    $(".cart_box").addClass("active");
  });
  $(".fa-times-circle").on('click', () => {
    $(".cart_box").removeClass("active");
  });
  //----------------------------------------------------------------------------------------

  //adding cartbox data in table
  let tableData = '';
  tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
  if(JSON.parse(localStorage.getItem('items'))[0] === null){
    tableData += '<tr><td colspan="5">No items found</td></tr>'
  }else{
    let no=1;
    JSON.parse(localStorage.getItem('items')).map(data=>{
      tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
    });
  }
  $(".cart_table").html(tableData);
  //---------------------------------------------------------------------------------------

  // smooth scrolling
  $('a[href*="#"]').on('click',function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop : $($(this).attr('href')).offset().top,
    },
      500,
      'linear'
    );
  });
});
  //---------------------------------------------------------------------------------------



  //Local storage for storing items
  let items = [];
  const attToCartBtn = document.getElementsByClassName('item');
	for(let i=0; i<attToCartBtn.length; i++){
		attToCartBtn[i].addEventListener("click",function(e){
			if(typeof(Storage) !== 'undefined'){
				let item = {
						id:i+1,
            name: e.target.parentElement.children[1].textContent,
            price: e.target.parentElement.children[2].children[0].textContent,
						no:1
					};
				if(JSON.parse(localStorage.getItem('items')) === null){
					items.push(item);
					localStorage.setItem("items",JSON.stringify(items));
					window.location.reload();
				}else{
					const localItems = JSON.parse(localStorage.getItem("items"));
					localItems.map(data=>{
						if(item.id == data.id){
							item.no = data.no + 1;
						}else{
							items.push(data);
						}
					});
					items.push(item);
					localStorage.setItem('items',JSON.stringify(items));
					window.location.reload();
				}
			}else{
				alert('local storage is not working on your browser');
			}
		});
	}
