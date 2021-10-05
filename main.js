// Vars
const body = document.getElementsByTagName('body')[0];
const container = document.querySelector('.container');
const content = document.querySelector('.content');


const getGithubUsers = async (url) => {
    const res = await fetch(url);

    try {
        return await res.json();
    } catch(err) {
        console.log(err);
    }
}

/**
 * Display reviced data into UI
 * @param {*} data Array
 */
function displayData(data)
{

    console.log(data);
    let html = '';
    data.forEach(user => {
        html += `
        <div class="user">
            <div>
                <img src="${user.avatar_url}" alt="${user.login}" class="user__img">
            </div>
            <div>
                <p class="user__name">${user.login}</p>
                <p class="user__name">Type: ${user.type}</p>
                <a href="${user.url}" class="user__link">Profile</a>
                <a href="${user.repos_url}" class="user__repos">Repos.</a>
            </div>
        </div>
        `;

    });

    content.innerHTML = html;
}

/**
 * Show Spinner function
 */
function showSpinner()
{
    content.classList.add("hidden");
    getGithubUsers("https://api.github.com/users").
    then(res => {
            displayData(res);
            setTimeout(function() {
                body.classList.remove('overlay');
                container.classList.remove('spinner');
                content.classList.remove("hidden");

            }, 3000);
        }
    );
}

showSpinner();