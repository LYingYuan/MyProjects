function createQuestion(arr, ops) {
  const len = arr.length;
  const questions = [];
  const nums = [];
  let res = 0;
  backTracking(nums, res, 0, []);
  return questions[0];

  function backTracking(nums, res, start_index, flags) {
    // 满足条件
    if (nums.length === 3 && res > 0 && res < 10000) {
      const question = [];
      question.push(nums[0]);
      question.push(ops[0]);
      question.push(nums[1]);
      question.push(ops[1]);
      question.push(nums[2]);
      questions.push(question);
      return;
    }

    for (let i = start_index; i < len; i++) {
      if (flags[i]) continue;
      const last_res = res;
      nums.push(arr[i]);
      flags[i] = true;
      res = calculate_res(nums, ops);
      backTracking(nums, res, i + 1, flags);
      flags[i] = false;
      nums.pop();
      res = last_res;
    }
  }
}

// 功能：实时计算
function calculate_res(nums, ops) {
  const len = nums.length;
  let str = "";
  switch (true) {
    case len === 1:
      res = nums[0];
      break;
    case len === 2:
      res = myEval(nums[0] + ops[0] + nums[1]);
      break;
    case len === 3:
      res = myEval(nums[0] + ops[0] + nums[1] + ops[1] + nums[2]);
      break;
  }
  return res;
}

// 功能：eval()方法的替代方案
function myEval(str) {
  return new Function("return " + str)();
}

// ============
const arr = [1, 2, 3, 4];
const ops = ["+", "*"];
console.log(createQuestion(arr, ops));
