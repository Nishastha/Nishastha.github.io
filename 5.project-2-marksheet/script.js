function generatecertificate(){
    const name=document.querySelector("#studentName").value;
    const symbolno=document.querySelector("#symbolno").value;
    const dob =document.querySelector("#dob").value;
    const schoolname=document.querySelector("#schoolname").value;
    console.log(name, symbolno, dob, schoolname);

    document.querySelector(".certName").textContent=name;
    document.querySelector(".certSymbolno").textContent=symbolno;
    document.querySelector(".certDob").textContent=dob;
    document.querySelector(".certSchoolname").textContent=schoolname;



}
