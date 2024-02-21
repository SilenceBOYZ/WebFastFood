const inputForm = document.querySelectorAll(".input-title");
const addBtn = document.getElementById("addBtn");


let checkTypeInput = (inputType, parentElementOfInput) => {
  switch (inputType.type) {
    case "email":
      parentElementOfInput.querySelector(".text-error-message").innerHTML = "Vui lòng nhập thông tin email"
      break;
    case "file":
      parentElementOfInput.querySelector(".text-error-message").innerHTML = "Vui lòng thêm đường dẫn hình ảnh"
      break;
    case "password":
      if (input.value.length < 1) {
        parentElementOfInput.querySelector(".text-error-message").innerHTML = "Mật khẩu không được rỗng"
        break;
      }
      if (input.value.length <= 8) {
        parentElementOfInput.querySelector(".text-error-message").innerHTML = "Mật khẩu tối đa 8 ký tự"
        break;
      }
    default:
      parentElementOfInput.querySelector(".text-error-message").innerHTML = "Vui lòng điền đầy đủ thông tin"
      break;
  }
}

let showInputMessageError = (input, parentElementOfInput) => {
  input.classList.add("input-active");
  parentElementOfInput.querySelector(".text-error-message").style.display = "inline-block";
}

let showInputMessageSuccess = (input, parentElementOfInput) => {
  input.classList.remove("input-active");
  parentElementOfInput.querySelector(".text-error-message").style.display = "none";
}

let hiddenInputMessage = (input, parentElementOfInput) => {
  input.classList.remove("input-active");
  parentElementOfInput.querySelector(".text-error-message").style.display = "none";
}

inputForm.forEach(input => {
  if (input) {
    let parentElementOfInput = input.parentElement;
    checkTypeInput(input, parentElementOfInput);
    input.onblur = (e) => {
      if (input.type == "password") {
        let passwordLength = (e.target.value).trim();
        if (passwordLength.length < 1) {
          showInputMessageError(input, parentElementOfInput);
        } else {
          showInputMessageSuccess(input, parentElementOfInput);
        }
      } else {
        if ((e.target.value).trim() == "") {
          showInputMessageError(input, parentElementOfInput);
        } else {
          showInputMessageSuccess(input, parentElementOfInput);
        }
      }
    }
    input.oninput = (e) => {
      hiddenInputMessage(input, parentElementOfInput);
    }
  }
})

addBtn.onclick = (e) => {
  inputForm.forEach(input => {
    let parentElementOfInput = input.parentElement;
    let inputLength = input.value.length;
    if (input.type == "file") {
      if (parentElementOfInput.id == "editforminput") {
        return;
      } else {
        if (inputLength < 1) {
          showInputMessageError(input, parentElementOfInput);
          e.preventDefault();
        }
      }
    } else {
      if (inputLength < 1) {
        showInputMessageError(input, parentElementOfInput);
        e.preventDefault();
      }
    }
  });
}
