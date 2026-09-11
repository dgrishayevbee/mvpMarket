import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Button, Input, Tabs } from "../components/ui/index.js";
import NavIcon from "../components/common/NavIcon.jsx";
import "./AuthPages.css";

const STEPS = [
  { id: "ecp", label: "1. ЭЦП" },
  { id: "company", label: "2. Компания" },
  { id: "biometry", label: "3. Биометрия" },
  { id: "documents", label: "4. Документы" },
];

// Демо-сертификат: в прототипе ключ не читается, данные «подтягиваются» сразу.
const CERT = {
  company: "ТОО «Ваша компания»",
  bin: "123456789012",
  signer: "Ахметов Арман Серикович",
  iin: "870514300123",
  role: "Первый руководитель",
  serial: "1f3a 7c02 9b41 d8e5",
  validUntil: "14.02.2027",
};

const SIGN_METHODS = [
  {
    id: "key",
    title: "Ключ ЭЦП (файл AUTH_RSA / RSA)",
    note: "Сертификат НУЦ РК из NCALayer — как при входе в eGov или Кабинет налогоплательщика",
  },
  {
    id: "egov",
    title: "eGov mobile — подпись по QR",
    note: "Отсканируйте QR в приложении eGov mobile и подтвердите подпись",
  },
];

const BIOMETRY_STAGES = [
  "Поиск лица в кадре",
  "Проверка живости: моргните",
  "Сверка с фото из документа",
];

const DOCUMENTS = [
  {
    id: "offer",
    title: "Договор-оферта на оказание услуг",
    note: "Рамочный договор Beeline Business с ТОО",
  },
  {
    id: "join",
    title: "Заявление о присоединении",
    note: "Подключение компании к единому счёту и личному кабинету",
  },
  {
    id: "pd",
    title: "Согласие на обработку персональных данных",
    note: "Для подписанта и сотрудников, которым выдадут доступ",
  },
  {
    id: "edo",
    title: "Соглашение об электронном документообороте",
    note: "Акты и ЭСФ приходят подписанными ЭЦП, без бумаги",
  },
];

function makeFingerprint() {
  return Array.from({ length: 4 }, () =>
    Math.random().toString(16).slice(2, 6).toUpperCase()
  ).join(" ");
}

function StepHeader({ icon, title, note }) {
  return (
    <div className="ecp-step__header">
      <span className="ecp-step__icon">
        <NavIcon name={icon} size={20} />
      </span>
      <div>
        <span className="ecp-step__title">{title}</span>
        <span className="ecp-step__note">{note}</span>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { registerCompany } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/profile";

  const [step, setStep] = useState("ecp");
  const [method, setMethod] = useState("key");
  const [keyFile, setKeyFile] = useState("");
  const [password, setPassword] = useState("");

  const [company, setCompany] = useState(CERT.company);
  const [bin, setBin] = useState(CERT.bin);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [biometryStage, setBiometryStage] = useState(-1);
  const [biometryDone, setBiometryDone] = useState(false);
  const [signed, setSigned] = useState({});
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const runBiometry = () => {
    setBiometryStage(0);
    BIOMETRY_STAGES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setBiometryStage(i + 1), (i + 1) * 900));
    });
    timers.current.push(setTimeout(() => setBiometryDone(true), BIOMETRY_STAGES.length * 900));
  };

  const signAll = () => {
    DOCUMENTS.forEach((doc, i) => {
      timers.current.push(
        setTimeout(
          () =>
            setSigned((prev) => ({
              ...prev,
              [doc.id]: { at: new Date(), fingerprint: makeFingerprint() },
            })),
          (i + 1) * 450
        )
      );
    });
  };

  const allSigned = DOCUMENTS.every((d) => signed[d.id]);

  const finish = () => {
    registerCompany({
      company,
      bin,
      signer: CERT.signer,
      iin: CERT.iin,
      email: email || "company@mvpmarket.dev",
      phone,
    });
    navigate(next);
  };

  return (
    <div className="auth-page auth-page--wide">
      <div className="auth-page__card auth-page__card--wide">
        <div>
          <h1 className="auth-page__title">Регистрация компании</h1>
          <p className="auth-page__subtitle">
            Аккаунт заводится на юридическое лицо: подписант подтверждает личность по ЭЦП и
            биометрии, договоры подписываются электронной подписью — без визита в офис и бумаги.
          </p>
        </div>

        <Tabs tabs={STEPS} activeId={step} onChange={() => {}} />

        {step === "ecp" && (
          <div className="ecp-step">
            <StepHeader
              icon="nav-security"
              title="Вход по электронной цифровой подписи"
              note="Данные компании возьмём из сертификата НУЦ РК — вводить БИН вручную не нужно"
            />

            <div className="ecp-options">
              {SIGN_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={"ecp-option" + (method === m.id ? " ecp-option--active" : "")}
                  onClick={() => setMethod(m.id)}
                >
                  <span className="ecp-option__title">{m.title}</span>
                  <span className="ecp-option__note">{m.note}</span>
                </button>
              ))}
            </div>

            {method === "key" ? (
              <div className="ecp-key">
                <div className="ecp-key__file">
                  <span className="ecp-key__file-name">
                    {keyFile || "Файл ключа не выбран"}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setKeyFile("AUTH_RSA256_1f3a7c02…p12")}
                  >
                    Выбрать ключ
                  </Button>
                </div>
                <Input
                  type="password"
                  placeholder="Пароль к хранилищу ключей"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            ) : (
              <div className="ecp-qr">
                <div className="ecp-qr__code" aria-hidden="true" />
                <span className="ecp-qr__note">
                  Откройте eGov mobile → «Цифровые документы» → сканируйте QR. Код обновится
                  через 2:00.
                </span>
              </div>
            )}

            <Button
              disabled={method === "key" && (!keyFile || !password)}
              onClick={() => setStep("company")}
            >
              Прочитать сертификат
            </Button>
          </div>
        )}

        {step === "company" && (
          <div className="ecp-step">
            <StepHeader
              icon="nav-management"
              title="Данные из сертификата"
              note="Проверьте компанию и оставьте контакты — на них придут счета и доступы"
            />

            <dl className="ecp-cert">
              <div>
                <dt>Подписант</dt>
                <dd>{CERT.signer}</dd>
              </div>
              <div>
                <dt>ИИН</dt>
                <dd>{CERT.iin}</dd>
              </div>
              <div>
                <dt>Роль в компании</dt>
                <dd>{CERT.role}</dd>
              </div>
              <div>
                <dt>Серийный номер сертификата</dt>
                <dd>{CERT.serial}</dd>
              </div>
              <div>
                <dt>Действителен до</dt>
                <dd>{CERT.validUntil}</dd>
              </div>
              <div>
                <dt>Статус в НУЦ РК</dt>
                <dd className="ecp-cert__ok">Действующий, не отозван</dd>
              </div>
            </dl>

            <label className="ecp-field">
              <span>Наименование компании</span>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} />
            </label>
            <label className="ecp-field">
              <span>БИН</span>
              <Input value={bin} onChange={(e) => setBin(e.target.value)} />
            </label>
            <label className="ecp-field">
              <span>E-mail для счетов и документов</span>
              <Input
                type="email"
                placeholder="buh@company.kz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="ecp-field">
              <span>Телефон подписанта</span>
              <Input
                placeholder="+7 (___) ___ __ __"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            <div className="ecp-actions">
              <Button variant="secondary" onClick={() => setStep("ecp")}>
                Назад
              </Button>
              <Button disabled={!company.trim() || !bin.trim()} onClick={() => setStep("biometry")}>
                Далее — подтверждение личности
              </Button>
            </div>
          </div>
        )}

        {step === "biometry" && (
          <div className="ecp-step">
            <StepHeader
              icon="nav-employees"
              title="Verigram Face ID"
              note="Биометрическая проверка подписанта: живость и сверка с фото из документа"
            />

            <div className="ecp-biometry">
              <div className={"ecp-biometry__frame" + (biometryDone ? " ecp-biometry__frame--ok" : "")}>
                <span className="ecp-biometry__face" aria-hidden="true" />
                <span className="ecp-biometry__hint">
                  {biometryDone
                    ? "Личность подтверждена"
                    : biometryStage < 0
                      ? "Расположите лицо в овале"
                      : BIOMETRY_STAGES[Math.min(biometryStage, BIOMETRY_STAGES.length - 1)]}
                </span>
              </div>

              <ol className="ecp-biometry__stages">
                {BIOMETRY_STAGES.map((stage, i) => (
                  <li
                    key={stage}
                    className={
                      "ecp-biometry__stage" +
                      (biometryStage > i ? " ecp-biometry__stage--done" : "") +
                      (biometryStage === i ? " ecp-biometry__stage--active" : "")
                    }
                  >
                    <span className="ecp-biometry__stage-mark">{biometryStage > i ? "✓" : i + 1}</span>
                    {stage}
                  </li>
                ))}
              </ol>
            </div>

            {biometryDone && (
              <div className="ecp-result">
                Совпадение с фото из документа — 98,6%. Проверка живости пройдена, данные сверены
                с базой ГБД ФЛ.
              </div>
            )}

            <div className="ecp-actions">
              <Button variant="secondary" onClick={() => setStep("company")}>
                Назад
              </Button>
              {biometryDone ? (
                <Button onClick={() => setStep("documents")}>Далее — подписание документов</Button>
              ) : (
                <Button disabled={biometryStage >= 0} onClick={runBiometry}>
                  {biometryStage >= 0 ? "Идёт проверка…" : "Запустить проверку"}
                </Button>
              )}
            </div>
          </div>
        )}

        {step === "documents" && (
          <div className="ecp-step">
            <StepHeader
              icon="nav-orders"
              title="Подписание документов ЭЦП"
              note="Подписываются тем же ключом — бумажные экземпляры и обмен по почте не нужны"
            />

            <ul className="ecp-docs">
              {DOCUMENTS.map((doc) => (
                <li key={doc.id} className="ecp-doc">
                  <div className="ecp-doc__body">
                    <span className="ecp-doc__title">{doc.title}</span>
                    <span className="ecp-doc__note">{doc.note}</span>
                    {signed[doc.id] && (
                      <span className="ecp-doc__sign">
                        Подписано ЭЦП · {CERT.signer} ·{" "}
                        {signed[doc.id].at.toLocaleTimeString("ru-RU")} · отпечаток SHA-256{" "}
                        {signed[doc.id].fingerprint}
                      </span>
                    )}
                  </div>
                  <span
                    className={"ecp-doc__status" + (signed[doc.id] ? " ecp-doc__status--ok" : "")}
                  >
                    {signed[doc.id] ? "Подписан" : "Ожидает подписи"}
                  </span>
                </li>
              ))}
            </ul>

            <div className="ecp-actions">
              {allSigned ? (
                <Button onClick={finish}>Завершить регистрацию</Button>
              ) : (
                <Button onClick={signAll}>Подписать все ЭЦП</Button>
              )}
            </div>
          </div>
        )}

        <span className="auth-page__hint">
          Уже есть аккаунт? <Link to={`/login?next=${encodeURIComponent(next)}`}>Войти</Link>
        </span>
      </div>
    </div>
  );
}
