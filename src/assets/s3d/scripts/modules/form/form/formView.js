import FormMonster from './form.js';
import SexyInput from '../input/input.js';
import i18next from 'i18next';
import * as yup from 'yup';
import dispatchTrigger from '../../helpers/triggers.js';
import Toastify from 'toastify-js'

export default class FormView {
  constructor(props) {
    this._id = `form-${(Math.random() * 1000).toFixed(0)}`;
    this.modalManager = props.modalManager;
    this.inited = false;
    this.init();
  }

  init() {
    if (!this.inited) {
      document.body.insertAdjacentHTML('beforeend', this.getTemplate());
      window.addEventListener('form-open', () => {
        this.open();
      });
      window.addEventListener('click', (evt) => {
        if (evt.target.closest('.form-layout-close') === null) return;
        this.close();
      });
      window.addEventListener('click', (evt) => {
        if (evt.target.closest('[data-open-form]') === null) return;
        dispatchTrigger('callback-click', {
          url: window.location.href
        })
        this.open();
      });

      this.initValidation();
      if (this.modalManager.push) {
        this.modalManager.push({
          id: this._id,
          close: () => {
            this.close();
          }
        })
      }
      this.inited = true;
    }
  }

  close() {
    document.querySelector(`#${this._id}`).style.visibility = '';
    document.querySelector(`#${this._id}`).style.opacity = '';
  }

  open() {
    document.querySelector(`#${this._id}`).style.visibility = 'visible';
    document.querySelector(`#${this._id}`).style.opacity = '1';
    if (this.modalManager.open) this.modalManager.open(this._id);
  }

  getTemplate() {
    return `
        <div class="toast-wrapper" data-toast-wrapper=""></div>
        <div class="form-layout" id="${this._id}">
            <div class="form">
                <svg class="form-layout-close" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30"></circle>
                  <path d="M37.826 37.826L22.1738 22.1738M22.1738 37.826L37.826 22.1738L22.1738 37.826Z"></path>
                </svg>
                <div class="form__title">${i18next.t('title')}</div>
                <form data-home-contact="data-home-contact" autocomplete="off">
                  <div class="form-field form-field-input" data-field-input="data-field-input" data-field-name="data-field-name" data-status="field--inactive">
                      <input class="form-field__input" type="text" name="name" placeholder="${i18next.t('namePlaceholder')}"/>
                      <div class="input-message" data-input-message="data-input-message">${i18next.t('name')}</div>
                  </div>
                  <div class="form-field disabled form-field-input" data-field-input="data-field-input" data-field-phone="data-field-phone" data-status="field--inactive">
                      <input class="form-field__input" type="text" name="phone"/>
                      <div class="input-message" data-input-message="data-input-message">${i18next.t('phone')}</div>
                  </div>
                  <div class="form-field disabled form-field-input" data-field-input="data-field-input" data-field-mail="data-field-mail" data-status="field--inactive">
                      <input class="form-field__input" type="text" name="mail" placeholder="${i18next.t('emailPlaceholder')}"/>
                      <div class="input-message" data-input-message="data-input-message">${i18next.t('email')}</div>
                  </div>
                  <button class="form__submit" type="submit" data-btn-submit="data-btn-submit">
                    <span class="link__text usn" data-btn-submit-text="data-btn-submit-text">${i18next.t('send')}</span>
                  </button>
                </form>
            </div>
        </div>
    `;
  }

  initValidation() {
    const $form = document.querySelector(`#${this._id} form`);
    new FormMonster({
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          document.querySelector(`#${this._id}`).style.visibility = '';
          document.querySelector(`#${this._id}`).style.opacity = '';
          Toastify({
            text: 'Your request has been successfully sent',
            duration: 5000
          }).showToast();
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },
          mail: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-mail]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('mail'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 20 - 8 })),
            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });
  }
}
