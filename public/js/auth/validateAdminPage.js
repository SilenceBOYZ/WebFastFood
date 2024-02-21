const email = document.getElementById("Useremail");
const password = document.getElementById("Userpassword");
const confirmPassword = document.getElementById("UserpasswordConfirm");
const userName = document.getElementById("Username");
const imageFile = document.getElementById("productimage");
const role = document.getElementById("UserRole");
const form = document.getElementById("userForm");


let showError = (input, message) => {
  let parent = input.parentElement;
  let MessageError = parent.querySelector(".text-error-message");
  input.classList.add("input-active");
  MessageError.style.display = "inline-block";
  MessageError.innerText = message;
}

let showSuccess = (input) => {
  let parent = input.parentElement;
  let MessageError = parent.querySelector(".text-error-message");
  input.classList.remove("input-active");
  MessageError.style.display = "none";
}

let checkEmptyError = (listInput) => {
  let isEmptyError = false;
  listInput.forEach(input => {
    input.value = input.value.trim();
    // Xóa khoảng trắng giữa hai đầu input
    if (!input.value) {
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
  if (input.value.length < 1) {
    showError(input, "Trường này không được để trống");
  } else if (regexEmail.test(input.value)) {
    fetch("http://localhost:8080/api/get-all-user")
    .then(response => {
      return response.json();
    })
    .then(userNames => {
      // json dạng mảng [{email: "nguyễn"}] thì khi xài hàm phải chấm để lấy thuộc tính
      let check = userNames.some(username => username.email === input.value);
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
  } else {
    showError(input, "Email Không hợp lệ");
  }

  return isEmailError;
}

let checkLengthError = (input, min, max) => {
  let regexUserNameError = /^[a-z0-9_-]{3,16}$/;
  input.value = input.value.trim();

  if (input.value.length < 1) {
    showError(input, `Trường này không được để trống`);
    return true;
  }

  if (regexUserNameError.test(input.value)) {
    showError(input, `Tên người dùng không bao gồm số`);
    return true;
  }

  if (input.value.length < min) {
    showError(input, `Phải có ít nhất ${min} ký tự`);
    return true;
  }

  if (input.value.length > max) {
    showError(input, `Không được quá ${max} ký tự`);
    return true;
  }


  showSuccess(input);
  return false;
}

let checkLengthPasswordError = (input) => {
  let regexPasswordError = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  input.value = input.value.trim();

  if (input.value.length < 1) {
    showError(input, `Trường này không được để trống`);
    return true;
  } else if (!input.value.match(regexPasswordError)) {
    showError(input, `Mật khẩu phải tối đa từ 8 đến 15 ký tự, 1 chữ viết hoa, 1 chữ viết thường, 1 ký tự đặc biệt`);
    return true;
  }

  showSuccess(input);
  return false;
}

let checkMatchPasswordError = (passwordInput, cfPasswordInput) => {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, "Mật khẩu không trùng khớp");
    return true;
  }
  return false;
}

let checkImageError = (imageFile, imageMax) => {
  let file = imageFile.files[0];
  let allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  let alertMessageError = allowedExtensions.join(", ");
  let regexPattern = new RegExp('\\.(' + allowedExtensions.join('|') + ')$', 'i');
  // regex to validate image file extension
  if (!file) {
    showError(imageFile, "Vui lòng chọn hình ảnh");
    return true;
  }
  if (!regexPattern.test(file.name)) {
    showError(imageFile, `File phải có định dạng ${alertMessageError}`);
    return true;
  } 
  let imageSize = (file.size / 1024).toFixed(2);
  if(imageSize> imageMax) {
    showError(imageFile, `Dung lượng hình không vượt quá ${imageMax} KB`);
    return true;
  }
  showSuccess(imageFile)
  return false;
}

form.addEventListener("submit", (e) => {
  let isEmpty = checkEmptyError([email, password, confirmPassword, userName, role]);
  let isEmailError = checkEmailError(email);
  let isImageError = checkImageError(imageFile, 500);
  let isUserNameLengthError = checkLengthError(userName, 8, 15);
  let isPasswordLengthError = checkLengthPasswordError(password);
  let isMatchError = checkMatchPasswordError(password, confirmPassword);


  if(isEmpty || isEmailError || isImageError || isUserNameLengthError || isPasswordLengthError || isMatchError) {
    e.preventDefault();
  }
});