
const account = document.getElementById("account-name");
const userPassword = document.getElementById("account-password");
const formLogin = document.getElementById("loginSite");


let showMessageError = (input, message) => {
  let parent = input.parentElement;
  let MessageError = parent.querySelector(".text-error-message");
  input.classList.add("input-active");
  MessageError.style.display = "inline-block";
  MessageError.innerText = message;
}

// logic để báo lỗi khi input thỏa điều kiện
let showSucceed = (input) => {
  let parent = input.parentElement;
  let MessageError = parent.querySelector(".text-error-message");
  input.classList.remove("input-active");
  MessageError.style.display = "none";
}

let checkInputEmptyError = (listInput) => {
  let isEmptyError = false;
  listInput.forEach(input => {
    input.value = input.value.trim();
    // Xóa khoảng trắng giữa hai đầu input
    if (!input.value) {
      isEmptyError = true;
      showError(input, "Trường này không được để trống");
    } else {
      showSucceed(input);
    }
  });

  return isEmptyError;
}

let checkEmailErr = (input) => {
  let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  input.value = input.value.trim();

  // Phần này dùng để trả về giá trị true false
  let isEmailError = !regexEmail.test(input.value);

  // Phần show hiển thị lên giao diện cho người dùng
  if (input.value < 1) {
    showMessageError(input, "Trường này không được để trống");
  } else if (regexEmail.test(input.value)) {
    showSucceed(input);
  } else {
    showMessageError(input, "Email Không hợp lệ");
  }
  return isEmailError;
}

let checkLengthPasswordErr = (input) => {
  let regexPasswordError = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  input.value = input.value.trim();

  if (input.value.length < 1) {
    showMessageError(input, `Trường này không được để trống`);
    return true;
  } else if (!input.value.match(regexPasswordError)) {
    showMessageError(input, `Mật khẩu phải tối đa từ 8 đến 15 ký tự, 1 chữ viết hoa, 1 chữ viết thường, 1 ký tự đặc biệt`);
    return true;
  }

  showSucceed(input);
  return false;
}

// let sendHttpRequest = (method, url, data) => {
//   return fetch(url, {
//     // Config HTTP Request
//     method: method,
//     body: JSON.stringify(data),
//     headers: data ? { 'Content-Type': 'application/json' } : {}
//   }).then(response => {
//     if (response.status >= 400) {
//       return response.json().then(errResData => {
//         const error = new Error("Something when wrong! ")
//         error.data = errResData;
//         throw error;
//       });
//     }
//     return response.json();
//   });
// }


// sendHttpRequest("POST", "http://localhost:8080/api/get-all-user/compare-password", {
//         email: account.value.trim(),
//         password: userPassword.value.trim()
//       })
//         .then(responseData => {
//           let checkErr = true;
//           if (!responseData.errCode) {
//             showMessageError(userPassword, responseData.errMessage);
//             return checkErr;
//           } else {
//             checkErr = false;
//             return checkErr;
//           }
//         })
//     }

formLogin.addEventListener("submit", (e) => {
  let isEmpty = checkInputEmptyError([account, userPassword]);
  let isEmailError = checkEmailErr(account);
  let isPassword = checkLengthPasswordErr(userPassword);
  if (isEmpty || isEmailError || isPassword) {
    e.preventDefault();
  }
})
