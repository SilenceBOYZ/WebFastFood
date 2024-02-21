const email = document.getElementById("email-name-register");
const userName = document.getElementById("account-name-register");
const password = document.getElementById("account-password-register");
const confirmPassword = document.getElementById("confirm-password-register");
const form = document.getElementById("sign-up-form");

// Viết theo hướng thủ tục 


// logic để báo lỗi khi input không thỏa điều kiện
let showError = (input, message) => {
  let parent = input.parentElement;
  let MessageError = parent.querySelector(".text-error-message");
  input.classList.add("input-active");
  MessageError.style.display = "inline-block";
  MessageError.innerText = message;
}


// logic để báo lỗi khi input thỏa điều kiện
let showSuccess = (input) => {
  let parent = input.parentElement;
  let MessageError = parent.querySelector(".text-error-message");
  input.classList.remove("input-active");
  MessageError.style.display = "none";
}

// Hàm kiểm tra xem một input có giá trị hay không
let checkEmptyError = (listInput) => {
  let isEmptyError = false;
  listInput.forEach( input => {
      input.value = input.value.trim();
      // Xóa khoảng trắng giữa hai đầu input
      if(!input.value) {
        isEmptyError = true;
        showError(input, "Trường này không được để trống");
      } else {
        showSuccess(input);
      }
  });

  return isEmptyError;
}

let checkEmailError = (input) => {
  let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  input.value = input.value.trim();
  
  // Phần này dùng để trả về giá trị true false
  let isEmailError = !regexEmail.test(input.value);

  // Phần show hiển thị lên giao diện cho người dùng
  if(input.value < 1) {
    showError(input, "Trường này không được để trống");
  } else if (regexEmail.test(input.value)){
    fetch("http://localhost:8080/api/get-all-user")
    .then(response => {
      return response.json();
    })
    .then(userNames => {
      // json dạng mảng [{email: "nguyễn"}] thì khi xài hàm phải chấm để lấy thuộc tính
      let check = userNames.some(username => (username.email).toLowerCase() === (input.value).toLowerCase());
      if(check) {
        showError(input, "Email đã tồn tại trong hệ thống");
        isEmailError = true;
        return isEmailError;
      } 
      return isEmailError;
    })
    .catch(e => {
      console.log(e);
    })  
    showSuccess(input);
  }else {
    showError(input, "Email Không hợp lệ");
  }

  return isEmailError;
}

let checkLengthError = (input, min, max) => {
  input.value = input.value.trim();

  if(input.value.length < 1) {
    showError(input, `Trường này không được để trống`);
    return true;
  }

  if(input.value.length < min) {
    showError(input, `Phải có ít nhất ${min} ký tự`);
    return true;
  }

  if(input.value.length > max) {
    showError(input, `Không được quá ${max} ký tự`);
    return true;
  }

  showSuccess(input);
  return false;
}



let checkLengthPasswordError = (input) => {
  let regexPasswordError = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  input.value = input.value.trim();

  if(input.value.length < 1) {
    showError(input, `Trường này không được để trống`);
    return true;
  } else if(!input.value.match(regexPasswordError)){
    showError(input, `Mật khẩu phải tối đa từ 8 đến 15 ký tự, 1 chữ viết hoa, 1 chữ viết thường, 1 ký tự đặc biệt`);
    return true;
  }

  showSuccess(input);
  return false;
}

let checkMatchPasswordError = (passwordInput, cfPasswordInput) => {
  if(passwordInput.value !== cfPasswordInput.value){
    showError(cfPasswordInput, "Mật khẩu không trùng khớp");
    return true;
  }
  
  return false;
}

form.addEventListener("submit", (e) => {
  
  let isEmpty = checkEmptyError([userName, email, password, confirmPassword]);
  let isEmailError = checkEmailError(email);
  let isUserNameLengthError = checkLengthError(userName, 8, 20);
  let isPasswordLengthError = checkLengthPasswordError(password);
  let isMatchError = checkMatchPasswordError(password, confirmPassword)

  if(isEmpty || isEmailError || isUserNameLengthError || isPasswordLengthError || isMatchError) {
    e.preventDefault();
  } 

});
