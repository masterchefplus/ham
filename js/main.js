// countdown
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse('10/10/2020 16:00:00') + 24 * 60 * 60 * 1000);
// var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);

// avoid scientific notation

// function toFixed(x) {
//     if (Math.abs(x) < 1.0) {
//         var e = parseInt(x.toString().split('e-')[1]);
//         if (e) {
//             x *= Math.pow(10, e - 1);
//             x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
//         }
//     } else {
//         var e = parseInt(x.toString().split('+')[1]);
//         if (e > 20) {
//             e -= 20;
//             x /= Math.pow(10, e);
//             x += (new Array(e + 1)).join('0');
//         }
//     }
//     return x;
// }



// check nagative
var amount = document.getElementById('amount');

amount.onkeydown = function (e) {
    if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        return false;
    }
}

// sponsor

var sponsorDefault = "THfYsDavQ3NWSJErDQrLiMy52eh6z87iUd";
var url_string = window.location.href;
var sp = url_string.substring(url_string.indexOf('/from') + 6, url_string.length);
console.log(sp)

var hamAmount = 0;
var trxAmount = 0;
var balance = 0;
$("#amount").on("input", function () {
    trxAmount = $("#amount").val();
    const price = 12;
    hamAmount = parseInt(trxAmount) / parseInt(price);
    console.log(hamAmount);
});

// $("#buy-btn").click(function () {

var addr;
if (isInstalled) {
    if (window.tronWeb.defaultAddress.hex) {
        addr = window.tronWeb.defaultAddress.base58;
    }
    console.log(addr);
}

if (isInstalled()) {
    var userRef = db.collection("users").where("address", "==", addr);
    userRef.get().then(snapshot => snapshot.forEach(doc => {
        if (!doc.exists) {
            console.log("not exists!");
            // if (isInstalled) {
            //     if (window.tronWeb.defaultAddress.hex) {
            //
            //         window.tronWeb.contract().at(contractAddress).then(function (contract) {
            //             contract.balanceOf(window.tronWeb.defaultAddress.base58).call({shouldPollResponse: true}).then(function (res) {
            //                 balance = (parseInt(res) / 1000000000000000000).toLocaleString();
            //             });
            //             console.log(balance);
            //         });
            //
            //         var a = document.getElementById("amount").value;
            //         if (a === "" || a <= 0) {
            //             alert("Please enter your Amount");
            //             return false;
            //         } else
            //             //let res =  tronweb.contract().at("TSHMJka5fK4MR1Ug38ZkZ9NGSduXeqvX7b").buy(10).send();
            //             window.tronWeb.contract().at(contractAddress).then(function (contract) {
            //                 contract.buy().send({
            //                     feeLimit: 1000000,
            //                     callValue: trxAmount * 1000000,
            //                     shouldPollResponse: true
            //                 }).then(function (res) {
            //                     console.log(res);
            //                 });
            //             });
            //
            //     } else {
            //         alert("Please login tronlink ");
            //     }
            // }

            var data2 = {
                "address": addr,
                "sponsor": sp,
                "amount": balance + hamAmount,
                "status": "INACTIVE",
                "commissionStatus": false
            }
            db.collection("users").add(data2).then(function () {
                console.log("Document successfully written!");
            });
        }
    }));

    var sponsorRef = db.collection("users").where("sponsor", "==", sp);
    sponsorRef.get().then(snapshot => snapshot.forEach(doc => {
        if (!doc.exists) {
            console.log("sponsorADdr not exists!");
            var data1 = {
                "address": addr,
                "sponsor": sponsorDefault,
                "amount": balance + hamAmount,
                "status": "INACTIVE",
                "commissionStatus": false
            }
            db.collection("users").add(data1).then(function () {
                console.log("Document successfully written!");
            });
        }
    }));
}

$("#buy-btn").click(function () {
    if (isInstalled()) {
        var userRef = db.collection("users").where("address", "==", addr);
        userRef.get().then(snapshot => snapshot.forEach(doc => {
            if (!doc.exists) {
                console.log("not exists!");
                // if (isInstalled) {
                //     if (window.tronWeb.defaultAddress.hex) {
                //
                //         window.tronWeb.contract().at(contractAddress).then(function (contract) {
                //             contract.balanceOf(window.tronWeb.defaultAddress.base58).call({shouldPollResponse: true}).then(function (res) {
                //                 balance = (parseInt(res) / 1000000000000000000).toLocaleString();
                //             });
                //             console.log(balance);
                //         });
                //
                //         var a = document.getElementById("amount").value;
                //         if (a === "" || a <= 0) {
                //             alert("Please enter your Amount");
                //             return false;
                //         } else
                //             //let res =  tronweb.contract().at("TSHMJka5fK4MR1Ug38ZkZ9NGSduXeqvX7b").buy(10).send();
                //             window.tronWeb.contract().at(contractAddress).then(function (contract) {
                //                 contract.buy().send({
                //                     feeLimit: 1000000,
                //                     callValue: trxAmount * 1000000,
                //                     shouldPollResponse: true
                //                 }).then(function (res) {
                //                     console.log(res);
                //                 });
                //             });
                //
                //     } else {
                //         alert("Please login tronlink ");
                //     }
                // }

                var data2 = {
                    "address": addr,
                    "sponsor": sp,
                    "amount": balance + hamAmount,
                    "status": "INACTIVE",
                    "commissionStatus": false
                }
                db.collection("users").add(data2).then(function () {
                    console.log("Document successfully written!");
                });
            }
        }));

        var sponsorRef = db.collection("users").where("sponsor", "==", sp);
        sponsorRef.get().then(snapshot => snapshot.forEach(doc => {
            if (!doc.exists) {
                console.log("sponsorADdr not exists!");
                var data1 = {
                    "address": addr,
                    "sponsor": sponsorDefault,
                    "amount": balance + hamAmount,
                    "status": "INACTIVE",
                    "commissionStatus": false
                }
                db.collection("users").add(data1).then(function () {
                    console.log("Document successfully written!");
                });
            }
        }));

        userRef.get().then(snapshot => snapshot.forEach(doc => {
            if (doc.get('commissionStatus') === false) {
                console.log("commission false!");

                if (window.tronWeb.defaultAddress.hex) {

                    window.tronWeb.contract().at(contractAddress).then(function (contract) {
                        contract.balanceOf(window.tronWeb.defaultAddress.base58).call({shouldPollResponse: true}).then(function (res) {
                            balance = (parseInt(res) / 1000000000000000000).toLocaleString();
                        });
                        console.log(balance);
                    });

                    var a = document.getElementById("amount").value;
                    if (a === "" || a <= 0) {
                        alert("Please enter your Amount");
                        return false;
                    } else
                        //let res =  tronweb.contract().at("TSHMJka5fK4MR1Ug38ZkZ9NGSduXeqvX7b").buy(10).send();
                        window.tronWeb.contract().at(contractAddress).then(function (contract) {
                            contract.buy().send({
                                feeLimit: 1000000,
                                callValue: trxAmount * 1000000,
                                shouldPollResponse: true
                            }).then(function (res) {
                                console.log(res);
                            });
                        });

                } else {
                    alert("Please login tronlink ");
                }

                var data = {
                    "sponsorAddress ": sp,
                    "amount": hamAmount
                }
                var data3 = {
                    "amount": balance + (hamAmount * 0.03),
                    "commissionStatus": true
                }
                db.collection("commission").add(data).then(function () {
                    console.log("Document commission successfully written!");
                });

                // let id = doc.id;
                // db.collection('users').doc(id).update(data3).then(function () {
                //     console.log("update user successfully")
                // })
            }
        }));
    }
})

// Stake


// $("#approve-btn").click(function () {
//     alert(1234);
//     if (isInstalled()) {
//         alert(123);
//         if (!allowance().exists || allowance() !== undefined){
//             if (window.tronWeb.defaultAddress.hex) {
//                 window.tronWeb.contract().at(contractAddress).then(function (contract) {
//                     contract.balanceOf(window.tronWeb.defaultAddress.base58).call({shouldPollResponse: true}).then(function (res) {
//                         balance = (parseInt(res) / 1000000000000000000).toLocaleString();
//                     });
//                     console.log(balance);
//                 });
//                 //let res =  tronweb.contract().at("TSHMJka5fK4MR1Ug38ZkZ9NGSduXeqvX7b").buy(10).send();
//                 window.tronWeb.contract().at(contractAddress).then(function (contract) {
//                     contract.stake().send({
//                         callValue: balance,
//                         shouldPollResponse: true
//                     }).then(function (res) {
//                         console.log(res);
//                     });
//                 });
//             } else {
//                 alert("Please login tronlink ");
//             }
//         }
//     }
// })

