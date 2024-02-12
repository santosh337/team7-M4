const element = [
  "name",
  "address",
  "email",
  "phone",
  "profile",
  "12",
  "12institution",
  "12yr",
  "bachelor",
  "bInst",
  "bYear",
  "master",
  "masterInst",
  "masterYear",
  "other",
  "jt1",
  "employer1",
  "year1",
  "jt2",
  "employer2",
  "year2",
  "work-other",
  "skills1",
  "skills2",
  "skills3",
  "lang1",
  "lang2",
  "lang3",
  "hobbies1",
  "hobbies2",
  "hobbies3",
];

let output = "minimalist";
let selected = document.getElementById("myselect");
document.getElementById("headerColor").addEventListener("input", function () {
  headerColor = this.value;
});

document.getElementById("textColor").addEventListener("input", function () {
  document.body.style.color = this.value;
});

selected.addEventListener("change", () => {
  document.getElementById(output).style.display = 'none'; 
  output = selected.value;
  document.getElementById(output).style.display = 'block'; 
});

function setData(element) {
  document.getElementById(output + "-" + element).innerHTML =
    document.getElementById(element)?.value;
}


document.getElementById("two-column").style.display = 'none';
document.getElementById("minimalist").style.display = 'none';
document
  .getElementById("resumeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    for (e of element) {
      setData(e);
    }
 
    
    document.getElementById(output+'-'+'img').src =URL.createObjectURL(
      document.getElementById("picture").files[0]
    );
  
    document.getElementById(output + "-" + "heading2").style.backgroundColor = headerColor;
    document.getElementById("downloadButton").style.display = "block";
    
    
  });

document.getElementById("downloadButton").addEventListener("click", function () {
       console.log("shobha");
    var element = document.getElementById(output).innerHTML;
    console.log("outputis", element);
   
       html2pdf(element);
var opt = {
  margin:       1,
  filename:     'myfile.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 1 },
  jsPDF:        { unit: 'in', format: 'A4', orientation: 'landscape' }
};
html2pdf().from(element).set(opt).save();
   
   
});

















































  