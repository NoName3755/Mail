document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#email-content').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  const compose_form = document.querySelector('#compose-form');

  compose_form.onsubmit = () => {
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
        load_mailbox('inbox');
    });
  };
}

function load_mailbox(mailbox) {
  const email_view = document.querySelector('#emails-view');
  // Show the mailbox and hide other views
  email_view.style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-content').style.display = 'none';

  // Show the mailbox name
  email_view.innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => show_emails(emails))
}

function show_emails(emails) {
  /* render emails to mailbox and add click event to every email */
  // console.log(emails);
  const email_view = document.querySelector('#emails-view');
  emails.forEach(email => {
    const mail = document.createElement('div');
    mail.className = 'email card my-2 px-3 py-2';

    const inner_mail = document.createElement('div');
    inner_mail.className = 'd-flex justify-content-between';

    inner_mail.innerHTML = `
      <div class="d-flex">
        <div class="fw-bold">${email.sender}</div>
        <div class="mx-3">${email.subject}</div>
      </div>
      <div class="fw-light">${email.timestamp}</div>
    `;

    // make card background if the email is already read
    // if (email.read) mail.style.background = '#F3F3F3';
    if (email.read) mail.classList.add('bg-gray');
    
    mail.append(inner_mail);

    mail.addEventListener('click', () => email_content(email.id));

    email_view.append(mail);
  });

  // If email is empty then show the message
  if (emails.length === 0) {
    const info_message = document.createElement('div');
    info_message.role = 'alert';
    info_message.className = 'alert alert-secondary';
    info_message.innerText = 'You have no emails at the moment.'

    email_view.append(info_message);
  }

}

function email_content(email_id) {
  /* Detail view of specific email */

  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';

  const email_view = document.querySelector('#email-content');
  email_view.style.display = 'block';

  // Render detail view of email
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
    email_view.innerHTML = `
      <div><strong>From: </strong>${email.sender}</div>
      <div><strong>To: </strong>${email.recipients}</div>
      <div><strong>Subject: </strong>${email.subject}</div>
      <div><strong>timestamp: </strong>${email.timestamp}</div>

      <div class="my-3">
        <button class="btn btn-sm" id="reply">
          <i class="fa fa-reply" aria-hidden="true"></i>
          Reply
        </button>
        <button 
          id="archive"
          class="btn btn-sm button-outline-warning ${(!email.archived) ? 'archive' : 'unarchive'}"
        >
          <i class="fa fa-archive" aria-hidden="true"></i>
          ${(!email.archived ? 'Archive' : 'Unarchive')}
        </button>
      </div>
      <hr>
      <div>${renderText(email.body)}<div>
    `;

    document.querySelector('#archive').addEventListener('click', () => toggle_archive(email_id, email.archived));
    document.querySelector('#reply').addEventListener('click', () => reply(email));
    
    // make the email read
    if (!email.read){
      fetch(`/emails/${email_id}`, {
        method: 'PUT', 
        body: JSON.stringify({
          read: true
        })
      });
    }

  });
}

function toggle_archive(email_id, is_archived) {
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      archived: !is_archived
    })
  });

  // load inbox
  load_mailbox('inbox');
}

function reply(email) {
  document.querySelector('#email-content').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Prefill form
  document.querySelector('#compose-recipients').value = email.sender;
  document.querySelector('#compose-subject').value = `${!email.subject.startsWith('Re: ') ? 'Re: ' : ''} ${email.subject}`;
  document.querySelector('#compose-body').value = `\n\n\nOn ${email.timestamp} ${email.sender} wrote:\n${email.body}`
}


function renderText(text) {
  // Render text in HTML, preserving line breaks and spaces
  const formattedText = text.replace(/\n/g, '<br>'); // Replace newlines with <br>
  return formattedText;
}