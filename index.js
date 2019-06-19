/**
 * Thiết kế database cho 1 hệ thống quản lý thư viện sách, cho biết thư viện này có hàng trăm giá sách khác nhau,
 * sách được để ở bất kì giá nào không theo danh mục nào.
 * Mỗi cuốn sách có 1 mã khác nhau.
 * Hệ thống cho phép đăng ký người dùng mới, một người có thể mượn nhiều sách khác nhau trong một khoảng thời gian hữu hạn.
 * Hệ thống có thể lưu lịch sử ai đã mượn sách nào, bắt đầu mượn từ bao lâu, trả lúc nào.
 * Hệ thống có lưu lại số ngày quá hạn tổng cộng của 1 người dùng, ví dụ sách A quá 2 ngày, sách B quá 3 ngày -> tổng 5 ngày
 */
const readline = require('readline-sync')
const fs = require('fs');
const data = require('./data.json');
const readFile = fs.readFileSync('./data.json');
const category = require('./category.json');
const book = require('./book.json');
var id = require('./id.json');

function showMenu() {
	console.log('1. Login');
	console.log('2. Create new account');
	var option = readline.question('> ');
	switch(option) {
		case '1':
			login(data);
			break;
		case '2':
			create(data);
			console.log('=====');
			showMenu();
			break;
		case 'add category':
			addCategory(category);
			break;
		case 'add book':
			addBook(book);
			break;
		default:
			console.log('wrong option, try again');
			showMenu();
			break;
	}	
}

function countID(arr) {
	var nid = id[0].ID;
	nid++;
	var newID = arr.map(function(item){
		return {ID : nid};
	});
	id[0].ID = nid;
	save (newID, './id.json');
	return nid;
}


function addBook(arr) {
	var ask1 = readline.question('Name:');
	var check1 = arr.filter(function(item){
		return item.name === ask1;
	});
	if (check1.length > 0 ) {
		console.log ('the book has been added');
	} else {
		var ask2 = readline.question('Class: ');
		var object = {
			name: ask1,
			ID: countID(id),
			class: ask2
		};
		arr.push(object);
		save(book, './book.json');	
	}
	showMenu();
}

function addCategory(arr) {
    var ask1 = readline.question('Name: ');
    var check1 = arr.filter(function(item){
        return item.name === ask1;
    });
    if (check1.length > 0 ) {
        console.log('The name has been taken');
        addCategory(arr)
    } else {
        var ask2 = readline.question('Class: ');
        var check2 = arr.filter(function(item){
            return item.class === ask2;
        });
        if (check2.length > 0) {
            console.log('The class has been taken');
        } else {
            var object = {
                name: ask1,
                class: ask2
            };
            arr.push(object);
            save(category, './category.json');
        }
    }
    
}


	
function showCategory(arr) {
	for (let show of arr) {
		console.log('category:\n'+ show.name);
	}
	console.log('choose your category:')
	var ask = readline.question('> ');
	console.log(getBook(ask));
}

function login(arr) {
	var ask1 = readline.question('Name: ');
	var ask2 = readline.question('Password:');
	var getID = arr.filter(function(item) {
		return item.name === ask1;
	});

	if (ask1 === getID[0].name && ask2 === getID[0].pass) {
		console.log('========================');
		console.log('---login successfully---');
		console.log('========================');
		showCategory(category);
	} else {
		console.log('X-unsuccessfully-X');
		login(arr);
	}
}
	
function create(arr) {
	var ask1 = readline.question('Name: ');
	var check = arr.filter((item)=>{
		return item.name === ask1;
	});
	if (check.length > 0) {
		console.log('the name has been taken');
		create(arr)
	} else {
		var ask2 = readline.question('Password: ');
		var object = {
			name: ask1,
			pass: ask2
		};
		data.push(object);
		save(data, './data.json');
	}
	
}


function save(x, path) {
	var content = JSON.stringify(x);
	var writeFile = fs.writeFileSync(path, content, {encoding: 'utf8'});
}


showMenu();