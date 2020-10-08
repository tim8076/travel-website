
let data ;
let dataText ;
let area = document.getElementById('Area');
let btn = document.querySelectorAll('.btn');
let place = document.querySelector('.container');
let title = document.getElementById('titleID');
 // 先建立新陣列
const DataNew = [];

//串接api取得資料
function xhrData(){
    let xhr = new XMLHttpRequest();
    xhr.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true);
    xhr.send(null);
    xhr.onload = function(){ 	
       data = JSON.parse(xhr.responseText);
       dataText = data.result.records;
       addData();
	   defaultData('三民區');
	   pagination(dataText,1);
    }   
}
xhrData();

function pagination(dataText,nowPage){
	//取得全部資料長度
	const dataTotal = dataText.length;

	//要顯示在畫面上的資料數量，預設每一頁只顯示6筆資料。
	const perpage = 6;

	// page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
    // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
    const pageTotal = Math.ceil(dataTotal / perpage);

    let currentPage = nowPage;
    if (currentPage > pageTotal) {
        currentPage = pageTotal;
    }
    
    //頁面資料筆數 最大值跟最小值
    const minData = (currentPage * perpage) - perpage + 1 ;
    const maxData = (currentPage * perpage) ;


    // 使用 ES6 forEach 做資料處理
    // 這邊必須使用索引來判斷資料位子，所以要使用 index
    dataText.forEach((item, index) => {
       const num = index + 1;  // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
      if ( num >= minData && num <= maxData) {
            DataNew.push(item);
         }
   
    })
    //動態加入分頁到 html上
    const pageid = document.getElementById('pageid');
    // 用物件方式來傳遞資料
    const page = {
	    pageTotal,
	    currentPage,
	    hasPrevious: currentPage > 1,
	    hasNext: currentPage < dataTotal,
	  }
	
   pageBtn(page);
}

//動態生成頁碼
function pageBtn(page){
		 let str = '';
		 const total = page.pageTotal;

		 if(page.hasPrevious){ 
            str += `<li class="page-item"><a class="page-link" href="#" 
            data-page="${Number(page.currentPage) }">Previous</a></li>`;
		 }else {
         str += `<li class="page-item disabled"><span class="page-link">Previous</span></li>`;
         }
         for(let i = 1; i <= total; i++){
		    if(Number(page.currentPage) === i) {
		      str +=`<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
		    } else {
		      str +=`<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
		    }
		  };

		  if(page.hasNext) { //判斷是否有下一頁
		    str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) }">Next</a></li>`;
		  } else {
		    str += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
		  }
	 pageid.innerHTML = str;
}

function switchPage(e){
  e.preventDefault();
  if(e.target.nodeName !== 'A') return;
  const page = e.target.dataset.page;
  pagination(dataText, page);
 }

pageid.addEventListener('click',switchPage);


//篩選不重複資料 加入下拉選單
function addData(){
   
   let dataTxt = dataText.map(function(item){
        return item.Zone;
   })
   let noRepeatData = dataTxt.filter(function(item, index, array){
       return array.indexOf(item) === index;
   });
   for(let i=0;i<noRepeatData.length;i++){
   	   let county = document.createElement('option');
   	   county.textContent = noRepeatData[i];
   	   area.appendChild(county);
   }
}
//預設顯示資料
function defaultData(city){
   let str = '';
   for(let i=0;i<dataText.length;i++){
       if(city === dataText[i].Zone ){
           str +=`<div class="item-card">
                     <div class="img-box" style="background-image: url(${dataText[i].Picture1});">
                        <h3>${dataText[i].Name}</h3>
                        <h5>${dataText[i].Zone}</h5>
                     </div>
                     <div class="txt">
                        <p class="time-Class">
                           <img src="../作業/image/icons_clock.png" alt="">
                           ${dataText[i].Opentime}
                        </p>
                        <p class="address-Class">
                           <img src="image/icons_pin.png" alt="">
                           ${dataText[i].Add}
                        </p>
                        <p class="phone-Class">
                           <img src="image/icons_phone.png" alt="">
                           ${dataText[i].Tel}
                        </p>
                        <div class="free">
                           <img src="image/icons_tag.png" alt="">
                           <h3>${dataText[i].Ticketinfo}</h3>
                        </div>
                     </div>
                  </div>`
        }    
    }
   title.textContent = city;
   place.innerHTML = str;
}

// 下拉式選單選擇不同地區資料 並印出網頁
function updateList(e){
   let select = e.target.value;
   let str = '';
   for(let i=0;i<dataText.length;i++){
       if(select === dataText[i].Zone){
           str += `<div class="item-card">
                     <div class="img-box" style="background-image: url(${dataText[i].Picture1});">
                        <h3>${dataText[i].Name}</h3>
                        <h5>${dataText[i].Zone}</h5>
                     </div>
                     <div class="txt">
                        <p class="time-Class">
                           <img src="../作業/image/icons_clock.png" alt="">
                           ${dataText[i].Opentime}
                        </p>
                        <p class="address-Class">
                           <img src="image/icons_pin.png" alt="">
                           ${dataText[i].Add}
                        </p>
                        <p class="phone-Class">
                           <img src="image/icons_phone.png" alt="">
                           ${dataText[i].Tel}
                        </p>
                        <div class="free">
                           <img src="image/icons_tag.png" alt="">
                           <h3>${dataText[i].Ticketinfo}</h3>
                        </div>
                     </div>
                  </div>`

        }    
    }
   title.textContent = select;
   place.innerHTML = str;
}

area.addEventListener('change',updateList);

//點擊熱門區域 並印出網頁
for(let i=0;i<btn.length;i++){
	btn[i].addEventListener('click',function(e){
       updateList(e);		
	})
}




