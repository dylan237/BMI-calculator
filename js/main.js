var btn = document.querySelector('.btn');
var btnStyle = document.querySelector('.circleBtn');
var list = document.querySelector('.BMIdetail');
var data = JSON.parse(localStorage.getItem('BMIData')) || [];
//計算BMI
btn.addEventListener('click', calcBMI, false);
updateData(data);

function calcBMI(e) {
    var height = (document.getElementById('height').value);
    var M = height / 100;
    var weight = document.getElementById('weight').value;
    var BMI = Math.ceil((weight / (M * M)) * 100) / 100;
    var status = '';
    var leftColor = '';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0
    var yyyy = today.getFullYear();
    var time = dd + '-' + mm + '-' + yyyy;
    if (height == '' || weight == '') {
        alert('請輸入身高體重');
        return;
    }

    if (BMI < 18.5) {
        status = '過輕';
        leftColor = 'level_A';
        btnStyle.setAttribute('class', 'btn_A circleBtn');
    } else if (18.5 <= BMI && BMI < 24) {
        status = '理想';
        leftColor = 'level_B';
        btnStyle.setAttribute('class', 'btn_B circleBtn');
    } else if (24 <= BMI && BMI < 27) {
        status = '過重';
        leftColor = 'level_C';
        btnStyle.setAttribute('class', 'btn_C circleBtn');
    } else if (27 <= BMI && BMI < 30) {
        status = '輕度肥胖';
        leftColor = 'level_D';
        btnStyle.setAttribute('class', 'btn_D circleBtn');
    } else if (30 <= BMI && BMI < 35) {
        status = '中度肥胖';
        leftColor = 'level_E';
        btnStyle.setAttribute('class', 'btn_E circleBtn');
    } else if (BMI >= 35) {
        status = '重度肥胖';
        leftColor = 'level_F';
        btnStyle.setAttribute('class', 'btn_F circleBtn');
    }

    
    var dataContent = {
        status: status,
        height: height,
        weight: weight,
        BMI: BMI,
        leftColor: leftColor,
        time: time
    };
    
    data.push(dataContent);
    localStorage.setItem('BMIData', JSON.stringify(data));
    
    document.querySelector('.value').textContent = BMI;
    updateData(data);
}

//將資料帶入畫面

function updateData(item) {
    var str = '';
    for (var i = 0; i < item.length; i++) {
        str += '<li class="' + item[i].leftColor + '"><h2>' + item[i].status + '</h2><p class="bmi">BMI<span>' + item[i].BMI + '</span></p><p class="wei">weight<span>' + item[i].weight + 'kg</span></p><p class="hei">height<span>' + item[i].height + 'cm</span></p><time class="BMIdate">' + item[i].time + '</time><img data-index="'+ i +'"class="del" src="../images/del.png"></img></li>'
    }
    list.innerHTML = str;
}

//刪除
delBtn = document.querySelector('.del');
list.addEventListener('click', del, false);

function del(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    var checkDel = confirm('確定要刪除嗎?');
    if (checkDel) {
        var index = e.target.dataset.index;
        data.splice(index, 1);
        updateData(data);
        localStorage.setItem('BMIData', JSON.stringify(data));
    }else {
        return;
    }
}