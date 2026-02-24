
let totalList = [];
let interviewList = [];
let rejectList = [];
let currentStatus = 'all';

const totalCount = document.querySelectorAll('.totalCount');
const interviewCount = document.getElementById('interviewCount');
const rejectCount = document.getElementById('rejectCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectFilterBtn = document.getElementById('reject-filter-btn');

const mainContainer = document.getElementById('main');
const allCards = document.getElementById('allCards');
const emptySection = document.getElementById('empty-section');
const filterSection = document.getElementById('filter-section');

console.log(interviewList.length)
console.log(rejectList.length)

// Total job counter 

function calculateCount(){
  totalList = allCards.children;
  totalCount.forEach(i => {
  i.innerHTML = totalList.length;
  })
   //count interview
   interviewCount.innerText = interviewList.length;
   //count interview
    rejectCount.innerText = rejectList.length;
}
calculateCount();


// calculateCount();
 


//ToggleStyle
function toggleStyle(id){
    //add bg-white class
    allFilterBtn.classList.add("bg-white", "text-[#64748B]", "border-[#F1F2F4]", "font-medium")
    interviewFilterBtn.classList.add("bg-white", "text-[#64748B]", "border-[#F1F2F4]", "font-medium")
    rejectFilterBtn.classList.add("bg-white", "text-[#64748B]", "border-[#F1F2F4]", "font-medium")
    //remove bg-primary class
    allFilterBtn.classList.remove("bg-primary", "text-white", "font-semibold")
    interviewFilterBtn.classList.remove("bg-primary", "text-white", "font-semibold")
    rejectFilterBtn.classList.remove("bg-primary", "text-white", "font-semibold")
    //selected style;
    const selected = document.getElementById(id);
    selected.classList.remove("bg-white", "text-[#64748B]", "border-[#F1F2F4]", "font-medium");
    selected.classList.add("bg-primary", "text-white", "font-semibold");

    //stored the id;
    currentStatus = id;

    //Visible section
    if (id == 'all-filter-btn') {
        allCards.classList.remove('hidden');
        filterSection.classList.add('hidden')
        emptySection.classList.add('hidden');
    } else if (id == 'interview-filter-btn') {
        allCards.classList.add('hidden');
        if(interviewList.length == 0){
            emptySection.classList.remove('hidden')
            filterSection.classList.add('hidden')
        }else if(interviewList.length !== 0){
            emptySection.classList.add('hidden')
            filterSection.classList.remove('hidden')
        }
        renderInterview();
    } else if (id == 'reject-filter-btn') {
        allCards.classList.add('hidden');
        if(rejectList.length == 0){
            emptySection.classList.remove('hidden')
            filterSection.classList.add('hidden')
        }else if(rejectList.length !== 0){
            emptySection.classList.add('hidden')
            filterSection.classList.remove('hidden')
        }
        renderRejected();
    }
}


//click function
mainContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;

        const jobName = parentNode.querySelector('.jobName').innerText;
        const designation = parentNode.querySelector('.designation').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const statusBox = parentNode.querySelector('.statusBox');
        const notes = parentNode.querySelector('.notes').innerText;

        statusBox.innerText = 'INTERVIEW';
        statusBox.className = "statusBox bg-white border border-[#10B981] text-[#10B981] font-medium text-[14px] px-3 py-2 rounded-md" 
        const statusText = statusBox.innerText;
        
        const cardInfo = {
            jobName,
            designation,
            salary,
            status: statusText,
            notes
        }
        const jobExist = interviewList.find(item => item.jobName == cardInfo.jobName)

        if (!jobExist) {
            interviewList.push(cardInfo);
        }

         rejectList = rejectList.filter(item => item.jobName !== cardInfo.jobName) 

        // after remove render the html
        if (currentStatus == 'reject-filter-btn') {
            renderRejected()
        }
        calculateCount();
    }

    else if(event.target.classList.contains('reject-btn')){
        const parentNode = event.target.parentNode.parentNode;

        const jobName = parentNode.querySelector('.jobName').innerText;
        const designation = parentNode.querySelector('.designation').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const statusBox = parentNode.querySelector('.statusBox');
        const notes = parentNode.querySelector('.notes').innerText;

        statusBox.innerText = 'REJECTED';
        statusBox.className = "statusBox bg-white border border-[#EF4444] text-[#EF4444] font-medium text-[14px] px-3 py-2 rounded-md";
        const statusText = statusBox.innerText;
        const cardInfo = {
            jobName,
            designation,
            salary,
            status: statusText,
            notes
        }
        const jobExist = rejectList.find(item => item.jobName == cardInfo.jobName)

        if (!jobExist) {
            rejectList.push(cardInfo);
        }

         interviewList = interviewList.filter(item => item.jobName != cardInfo.jobName)

        // after remove rerender the html
        if (currentStatus == 'interview-filter-btn') {
            renderInterview()
        }
        calculateCount();
    }
})


//Add div to filter section 
//
function renderInterview(){
    //every time the filter section will empty first
    filterSection.innerHTML = '';
    if(interviewList.length == 0){
            emptySection.classList.remove('hidden')
            filterSection.classList.add('hidden')
    }

    for(let interview of interviewList){
        let div = document.createElement('div');
        div.className = "space-y-5 bg-white rounded-lg p-6 border-2 border-base-300 transition duration-300 ease-in-out hover:-translate-y-0.5 hover:border-[#526992ac]";
        div.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
              <h4 class="jobName font-semibold text-[18px] text-[#002C5C]">
                ${interview.jobName}
              </h4>
              <p class="designation text-[#64748B]">${interview.designation}</p>
            </div>
            <!-- Delete btn  -->
            <div>
              <button
                class="deleteBtn btn border-none w-full p-0 bg-transparent shadow-none hover:bg-transparent"
              >
                <img src="./delete-btn.svg" alt="" />
              </button>
            </div>
          </div>
          <div>
            <p class="salary text-[#64748B]">
              ${interview.salary}
            </p>
          </div>

          <div>
            <span
              class="statusBox bg-white border border-[#10B981] text-[#10B981] font-medium text-[14px] px-3 py-2 rounded-md"
              >${interview.status}</span
            >
            <p class="notes mt-2 text-[#323B49]">
              ${interview.notes}
            </p>
          </div>

          <!-- buttons -->
          <div class="flex gap-2">
            <button
              class="interview-btn btn bg-white border border-[#10B981] text-[#10B981] px-3 py-2 text-[14px] rounded-md font-semibold"
            >
              INTERVIEW
            </button>
            <button
              class="reject-btn btn bg-white border border-[#EF4444] px-3 py-2 text-[14px] rounded-md font-semibold text-[#EF4444]"
            >
              REJECTED
            </button>
          </div>
        `
        filterSection.appendChild(div);
    }
}


function renderRejected(){
    //every time the filter section will empty first
    filterSection.innerHTML = '';
      if(rejectList.length == 0){
            emptySection.classList.remove('hidden')
            filterSection.classList.add('hidden')
        }

    for(let reject of rejectList){
        let div = document.createElement('div');
        div.className = "space-y-5 bg-white rounded-lg p-6 border-2 border-base-300 transition duration-300 ease-in-out hover:-translate-y-0.5 hover:border-[#526992ac]";
        div.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
              <h4 class="jobName font-semibold text-[18px] text-[#002C5C]">
                ${reject.jobName}
              </h4>
              <p class="designation text-[#64748B]">${reject.designation}</p>
            </div>
            <!-- Delete btn  -->
            <div>
              <button
                class="deleteBtn btn border-none w-full p-0 bg-transparent shadow-none hover:bg-transparent"
              >
                <img src="./delete-btn.svg" alt="" />
              </button>
            </div>
          </div>
          <div>
            <p class="salary text-[#64748B]">
              ${reject.salary}
            </p>
          </div>

          <div>
            <span
              class="statusBox bg-white border border-[#EF4444] text-[#EF4444] font-medium text-[14px] px-3 py-2 rounded-md"
              >${reject.status}</span
            >
            <p class="notes mt-2 text-[#323B49]">
              ${reject.notes}
            </p>
          </div>

          <!-- buttons -->
          <div class="flex gap-2">
            <button
              class="interview-btn btn bg-white border border-[#10B981] text-[#10B981] px-3 py-2 text-[14px] rounded-md font-semibold"
            >
              INTERVIEW
            </button>
            <button
              class="reject-btn btn bg-white border border-[#EF4444] px-3 py-2 text-[14px] rounded-md font-semibold text-[#EF4444]"
            >
              REJECTED
            </button>
          </div>
        `
        filterSection.appendChild(div);
    }
}



//Delete btn function
mainContainer.addEventListener('click', function(event){
  const deleteBtn = event.target.closest('.deleteBtn')
  if(deleteBtn){
    const card = event.target.parentNode.parentNode.parentNode.parentNode;
    
    card.remove();
    
    calculateCount();
  }
})
