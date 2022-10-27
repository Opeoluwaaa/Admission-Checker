
let admission_check = function check() {
    // GettingPersonal details
    let person = {
        firstname: document.getElementById('fname').value,
        lastname: document.getElementById('lname').value,
        fulname: function () {
            return (this.firstname + ' ' + this.lastname);
        } 
    };

    let namef = person.firstname;
    let namel = person.lastname;
    
    // console.log(person.fulname());

    //end of getting personal details


    //getting utme and post utme percentage scores
    let jp_scores = {
        jamb : document.getElementById('utme').value,
        post_jamb: document.getElementById('putme').value,
        jamb_percent : function () {

            let jper = this.jamb / 8;
            return Math.round(jper);

        },
        post_jamb_percent: function () {
            return Number(this.post_jamb);
        }

    }

    let utme_percent = jp_scores.jamb_percent();
    let putme_percent = jp_scores.post_jamb_percent();

    // console.log(utme_percent, putme_percent);

    //end of getting utme and post utme percentage scores


    //getting waec grades percentage

    selectedsubjects = (function () {

        let waec_subjects = {
            sub1: document.getElementById('s1').value,
            sub2: document.getElementById('s2').value,
            sub3: document.getElementById('s3').value,
            sub4: document.getElementById('s4').value,
            sub5: document.getElementById('s5').value,
            sub6: document.getElementById('s6').value,
            sub7: document.getElementById('s7').value,
            sub8: document.getElementById('s8').value,
            sub9: document.getElementById('s9').value,
        }

        let sub_name = Object.values(waec_subjects);

        // console.log(waec_subjects);
        // console.log(sub_name);
    }) ();

    selectedgrades = (function getSelectedGrade () {
        let elements = document.getElementsByClassName('subject');
        let waec_grades = [];
    
        for (let i =0; i < elements.length; i++) {
            let element = elements[i];
            let Sel = element.options[element.selectedIndex].text;
            waec_grades.push(Sel);
        };

        let waec_score = waec_grades.map((grade) => {
            switch (grade) {
                case 'A1':
                    return 10;
                case 'B2':
                    return 9;
                case 'B3':
                    return 8;
                case 'C4':
                    return 7;
                case 'C5':
                    return 6;
                case 'C6':
                    return 5;
                case 'D7':
                    return 0;
                case 'E8':
                    return 0;
                case 'F9':
                    return 0;
            };
        });

        const waecGradeSum = (numbersArray) => 
            numbersArray.reduce (
                (accumulator, number) => number + accumulator, 0
            );
        
        let Olevel_score = waecGradeSum(waec_score);

        Olevel_percent = (function () {
            return Math.round((Olevel_score / 90) * 30);
        }) ();
    
        // console.log(waec_grades);
        // console.log(waec_score);
        // console.log(Olevel_score);
        // console.log(Olevel_percent);
        
    }) ();

    let waec_percent = Olevel_percent;
    
    //end of getting waec percentage scores


    //calculating the total percentage to check admission status

    let total = utme_percent + putme_percent + waec_percent;

    console.log( total);

    //end of calculation

    document.getElementById('con2').style.visibility = 'visible';
    document.getElementById('close_button').style.visibility = 'visible';


    //number of sitting

    let numsit = Number(document.getElementById('sitting').value);

    // console.log(numsit);
    // console.log(namef);

    //end of number of sitting


    //conditional statements for admission

    check = (function () {

        let fmessage = "Error! Error!! Error!!! Invalid Input. Check again and kindly input your First Name."

        let lmessage = "Error! Error!! Error!!! Invalid Input. Check again and kindly input your Last Name."

        let jmessage = "Unfortunately your admission can not be processed simply because you inputed an incorrect Jamb score. Kindly recheck your input. Thank You.";

        let pmessage = "Unfortunately your admission can not be processed simply because you inputed an incorrect Post Jamb score. Kindly recheck your input. Thank You.";

        let sitmessage = " Unfortunately, your admission can not be processeed simply because your number of sitting is more than 2. We only process applicants with a maximum of 2 sittings. Thanks for your understanding.";

        let message1 = "Congratulations! You are qualified for admission based on MERIT. Your overall percentage scare is " + total + '%.';

        let message2 = "Congratulations! You are qualified for admission based on CONCESSION. Your overall percentage scare is " + total + '%.';

        let message3 = "Congratulations! You are qualified for admission based on CATCHMENT. Your overall percentage scare is " + total + '%.';

        let message4 = "Congratulations! You are qualified for admission based on the VC's CONSIDERATION. Your overall percentage scare is " + total + '%.';

        let message5 = "Unfortunately, you are unable to meet the admission  off mark as your Overall Percentage Score falls below 60%";

        if (namef == '') {
            
            document.getElementById('status').innerHTML = fmessage;

        } else if (namel == '') {
            
            document.getElementById('status').innerHTML = lmessage;

        } else if (utme_percent > 50) {
            
            document.getElementById('status').innerHTML = jmessage;
            
        } else if (utme_percent <= 0 ) {
            
            document.getElementById('status').innerHTML = jmessage;
            
        }  else if (putme_percent > 20) {
            
            document.getElementById('status').innerHTML = pmessage;

        } else if (putme_percent <= 0 ) {
            
            document.getElementById('status').innerHTML = pmessage;

        } else if (numsit > 2) {

            document.getElementById('status').innerHTML = sitmessage;

        } else if (numsit <= 0) {

            document.getElementById('status').innerHTML = sitmessage;

        } else if (total >= 80 && total < 100) {

            document.getElementById('status').innerHTML = message1;

        } else if (total >= 75 && total < 80) {

            document.getElementById('status').innerHTML = message2;

        } else if (total >= 65 && total < 75) {

            document.getElementById('status').innerHTML = message3;

        } else if (total >= 60 && total < 65) {

            document.getElementById('status').innerHTML = message4;

        } else {

            document.getElementById('status').innerHTML = message5;
        } 
    }) ();

    //end of conditional statements
}


document.getElementById('submit_button').onclick = admission_check;


let close_tab = function close () {
    document.getElementById('con2').style.visibility = 'hidden';
    document.getElementById('close_button').style.visibility = 'hidden';
}

document.getElementById('close_button').onclick = close_tab;