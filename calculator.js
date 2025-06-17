const subjectdata = [];
const finaloutput = [];
let totalcredits = 0;
let gpa=0;
const mymap=new Map(); 
function gradetopoints(grade) {
  switch (grade.toUpperCase()) {
    case 'O':
    case 'S':
    return 10;
    case 'A': return 9;
    case 'B': return 8;
    case 'C': return 7;
    case 'D': return 6;
    case 'E': return 5;
    default: return 0;
  }
}
function capitalizeFirstLetter(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

document.addEventListener("DOMContentLoaded", function () {
  const subjectInput = document.getElementById("subjects");
  const gradeInput = document.getElementById("grades");
  const creditInput = document.getElementById("credits");

  const warning = document.getElementById("grade-warning");
  const credwarning = document.getElementById("credit-warning");

  const submitButton = document.getElementById("submits");
  const finalButton = document.getElementById("final");
  const dummy=document.getElementById("warningdup");
 const finalwarnings=document.getElementById("finalwarn");
  if (submitButton) {
    submitButton.addEventListener("click", function (e) {
      e.preventDefault();

      const subject = capitalizeFirstLetter(subjectInput.value.trim());
      const credit = creditInput.value.trim();
      const creditValue = parseFloat(credit);
      const grade = gradeInput.value.trim().toUpperCase();
     
     if(mymap.has(subject))
     {
      dummy.style.display="block";
      return;
     }
   
     
     
      if (isNaN(creditValue) || creditValue < 0.5 || creditValue > 5) {
        credwarning.style.display = "block";
        return;
      }
       else {
        credwarning.style.display = "none";

      

      if (!['O', 'A', 'B', 'C', 'D', 'E', 'F', 'S'].includes(grade)) {
        warning.style.display = "block";
        return;
      } else {
        warning.style.display = "none";
    
       if (subjectdata.length >=10) {
        subjectoverflow.style.display="block";
        return;
      }
       mymap.set(subject,true);
      subjectdata.push({ subject, grade, credit: creditValue });
      totalcredits += creditValue;
       finalwarnings.style.display="none";
       subjectunderflow.style.display="none";
      subjectInput.value = "";
      gradeInput.value = "";
      creditInput.value = "";
      subjectInput.focus();
    }}
    });
  }

  
  if (finalButton) {
    finalButton.addEventListener("click", function (e) {
      e.preventDefault();

      

 const subjectInput = document.getElementById("subjects");
  const gradeInput = document.getElementById("grades");
  const creditInput = document.getElementById("credits");

  const warning = document.getElementById("grade-warning");
  const credwarning = document.getElementById("credit-warning");
 

   const subject = capitalizeFirstLetter(subjectInput.value.trim());
      const credit = creditInput.value.trim();
      const creditValue = parseFloat(credit);
      const grade = gradeInput.value.trim().toUpperCase();
if(subject&&credit&&grade){
  if(mymap.has(subject))
     {
      dummy.style.display="block";
      return;
     }
      if (isNaN(creditValue) || creditValue < 0.5 || creditValue > 5) {
        credwarning.style.display = "block";
        return;
      }
       else {
        credwarning.style.display = "none";
       }
         if (!['O', 'A', 'B', 'C', 'D', 'E', 'F', 'S'].includes(grade)) {
        warning.style.display = "block";
        return;
      } else {
        warning.style.display = "none";
      }

 subjectdata.push({ subject, credit: creditValue, grade });
 totalcredits+=creditValue;
  finalwarnings.style.display="none";
      
}
  if (subjectdata.length === 0) {
        subjectunderflow.style.display="block";
        return;
      }
     
   

      finaloutput.length = 0;

      for (let i = 0; i < subjectdata.length; i++) {
        const data = subjectdata[i];
        const creditassociated = (data.credit / totalcredits)*10;
        const achieved = (creditassociated * gradetopoints(data.grade)/10);
        gpa+=achieved;
        finaloutput.push({
          subject: data.subject,
          grade: data.grade,
          credit: data.credit,
          creditassociated: creditassociated.toFixed(2),
          achieved: achieved.toFixed(2)
        });
      }
  localStorage.setItem("finaloutput", JSON.stringify(finaloutput));
  localStorage.setItem("gpa", JSON.stringify(gpa));
window.location.href = "result.html";

    });
  }
});
