export const fetchErrors = {
    verify: "Аккаунт пользователя не подтвержден!",
    forbidden: "Вы заблокированы и не можете войти!"
}
export const usersArr = [
    { name: 'Менеджер', value: 'manager' },
    { name: 'Пользователь', value: 'user' },
    { name: 'Эксперт', value: 'expert' },
    { name: 'Рабочая группа', value: 'workingGroup' },
    { name: "Эксперт спецконкурса", value: 'expertSpecComp' }
]
export const booleanArr = [
    { name: 'Да', value: true },
    { name: 'Нет', value: false },
]
export const projectFieldsArr = [
    {
        name: "Название проекта",
        tippyName: "Основная мысль проекта должна быть ясна из его краткого и конкретного названия без общих фраз. Оформите его с заглавной буквы и без кавычек.",
        value: "",
        translitName: "title",
        required: true,
        error: false,
        errorTxt: "Заполните поле",
    },
    {
        name: "Обложка",
        value: [],
        translitName: "imageURL",
        type: "image",
        required: true,
        error: false,
        errorTxt: "Выберите изображение",
        validate: {
            types: ["image/jpeg", "image/gif", "image/png"],
            format: ".jpg, .jpeg, .gif, .png",
            resolution: "1420x660",
            width: 1420,
            height: 660,
            size: 5 * 1024 * 1024
        }
    },
    {
        name: "Направление",
        tippyName: "Выберите одно направление, наиболее точно соответствующее основной цели вашего проекта. Если проект комплексный и затрагивает несколько сфер, определите приоритетную, по которой оценивается главный результат.",
        value: "",
        type: "select",
        translitName: "direction",
        required: true,
        error: false,
        errorTxt: "Выберите направление"
    },
    {
        name: "Грантополучатель",
        value: "1",
        translitName: "grantee",
        type: "radio"
    },
    {
        name: "Сумма грантовых средств, запрашиваемая для реализации проекта",
        tippyName: "Укажите точный объем финансирования, который вы хотите получить от грантодателя. Эта сумма должна быть экономически обоснована и полностью соответствовать статьям расходов в смете проекта. Она не может превышать лимит, установленный условиями конкурса.",
        value: "",
        translitName: "sum",
        type: "number",
        required: true,
        error: false,
        errorTxt: "Укажите сумму"
    },
    {
        name: "Сумма софинансирования",
        tippyName: "Внесите общую стоимость всех ресурсов, которые ваша организация вкладывает в проект помимо запрашиваемого гранта. Чем выше софинансирование, тем выше финансовая устойчивость и проработанность проекта в глазах экспертов.",
        value: "",
        translitName: "coFinancing",
        type: "number",
        required: false,
        error: false,
        errorTxt: "Укажите сумму"
    },
    {
        name: "Процент софинансирования",
        tippyName: "Этот показатель рассчитывается автоматически и показывает, какую часть общих затрат вы покрываете самостоятельно.<br><br>Если запрашиваемая сумма гранта превышает 1 000 000 рублей, обязательный минимальный процент софинансирования определяется в зависимости от суммы гранта:<br><br><ul><li>от 1 000 000 до 1 500 000 рублей – минимальное софинансирование 10% от полной стоимости реализации проекта.</li><li> от 1 500 001 до 1 900 000 рублей – минимальное софинансирование 15% от полной стоимости реализации проекта.</li><li>от 1 900 001 до 2 000 000 рублей – минимальное софинансирование 20% от полной стоимости реализации проекта.</li></ul>Убедитесь, что рассчитанное значение соответствует этому требованию.",
        value: "",
        translitName: "coFinancingPercent",
        type: "readonly",
    },
    {
        name: "Краткое описание проекта",
        tippyName: "Коротко, но содержательно раскройте основную идею, уникальность проекта, его ключевые смыслы, целевую аудиторию с обоснованием выбора, основные методы реализации и важнейшие подтверждаемые результаты. Избегайте подробностей, дублирующих другие разделы заявки.",
        value: "",
        translitName: "description",
        type: "html",
        required: true,
        validate: {
            limit: 300
        },
        error: false,
        errorTxt: "Заполните поле",
        notyTxt: "Максимальный объем: 300 символов, включая пробелы."
    },
    {
        name: "Целевая аудитория проекта",
        tippyName: "Опишите конкретную группу людей, чью проблему решает проект. Укажите их возраст, социальный статус, территорию, интересы. Чем точнее описание, тем проще будет показать, как именно проект им поможет. Избегайте слишком широких формулировок.",
        value: "",
        translitName: "targetAudience",
        type: 'html',
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Актуальность проекта для целевых аудиторий",
        tippyName: "Обоснуйте, почему ваш проект важен именно сейчас. Чётко сформулируйте конкретную проблему или потребность вашей целевой аудитории, её причины. Подкрепите это данными: статистикой, исследованиями, ссылками на тренды или мнения экспертов.",
        value: "",
        translitName: "relevance",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Цель проекта",
        tippyName: "Чётко сформулируйте главный итог вашей работы — решение проблемы, описанной в актуальности проекта. Цель должна быть конкретной, измеримой и достижимой. Ответьте на вопросы: что изменится, для кого и в какие сроки, указав ключевые количественные показатели.",
        value: "",
        translitName: "goal",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Задачи проекта",
        tippyName: "Перечислите ключевые шаги (этапы) для достижения цели проекта. Каждая задача — это конкретное действие. Используйте глаголы: разработать, организовать, провести, привлечь, проанализировать. Эти задачи станут основой для календарного плана и должны охватывать все этапы — от подготовки до подведения итогов.",
        value: "",
        translitName: "tasks",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Наличие социокультурных эффектов. Количественные показатели",
        tippyName: "Сформулируйте, как именно изменится жизнь или ситуация вашей целевой аудитории в результате проекта. Затем переведите эти изменения в конкретные цифры: например, количество человек, получивших пользу, число мероприятий, процент снижения проблемы. Это должны быть измеримые результаты.",
        value: "",
        translitName: "culturalEffectsQuantity",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Наличие социокультурных эффектов. Качественные показатели",
        tippyName: "Опишите сущностные изменения, которые произойдут с аудиторией или в общественной среде благодаря проекту (рост осведомлённости, улучшение навыков, изменение отношений). Укажите, как эти изменения будут зафиксированы — через анкеты, интервью, экспертные оценки или наблюдения.",
        value: "",
        translitName: "culturalEffectsQuality",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Наличие экономического эффекта. Прямые экономические эффекты",
        tippyName: "Опишите прямую экономическую выгоду для региона, которая возникнет благодаря проекту. Укажите, как именно выразится эта выгода: через рост налоговых отчислений, увеличение прибыли организаций-участников, сокращение расходов или оптимизацию хозяйственных процессов. Приведите конкретные показатели, если это возможно.",
        value: "",
        translitName: "economicEffectsDirect",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле",
        notyTxt: "Если вы участвуете в специальной грантовой поддержке культурных проектов, посвященных теме «Единство народов России», в этом поле можете поставить прочерк."
    },
    {
        name: "Наличие экономического эффекта. Косвенные экономические эффекты",
        tippyName: "Опишите долгосрочные и сопутствующие экономические выгоды, которые проект принесёт региону или отрасли. Это могут быть: рост качества продукции, выход на новые рынки, сокращение производственного цикла, развитие смежных отраслей или создание новых рабочих мест.",
        value: "",
        translitName: "economicEffectsIndirect",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле",
        notyTxt: "Если вы участвуете в специальной грантовой поддержке культурных проектов, посвященных теме «Единство народов России», в этом поле можете поставить прочерк."
    },
    {
        name: "Смета",
        tippyName: "Заполните смету, используя предоставленный шаблон. При составлении бюджета руководствуйтесь методическими рекомендациями по подготовке сметы проекта.",
        value: [],
        translitName: "budget",
        type: "file",
        required: true,
        error: false,
        errorTxt: "Выберите файл",
        validate: {
            types: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
            format: ".xls, .xlsx",
            size: 5 * 1024 * 1024
        }
    },
    {
        name: "Визуальная составляющая проекта",
        tippyName: "Загрузите ключевые визуальные материалы: логотип, палитру цветов, элементы фирменного стиля и другие изображения, отражающие концепцию проекта.",
        value: [],
        translitName: "visualComponent",
        type: "file",
        required: true,
        error: false,
        errorTxt: "Выберите файл",
        validate: {
            types: [
                "application/pdf",
                "application/vnd.ms-powerpoint",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            ],
            format: ".pdf, .ppt, .pptx",
            size: 5 * 1024 * 1024
        }
    },
    {
        name: "Партнеры проекта",
        tippyName: "Укажите внешние организации и отдельных лиц (не входящих в вашу команду), которые окажут проекту поддержку. Для каждого укажите конкретную форму помощи: информационную, организационную, материальную или иную. Прикрепите письмо от каждого партнёра в качестве подтверждения. Рекомендуется объединить письма в один PDF-файл.",
        translitName: "partners",
        type: "mixed",
        required: true,
        error: false,
        errorTxt: "",
        fields: {
            text: {
                value: '',
                required: true,
                error: false,
                errorTxt: "Заполните поле",
            },
            files: {
                value: [],
                required: true,
                error: false,
                errorTxt: "Выберите файл",
                validate: {
                    types: [
                        "application/pdf"
                    ],
                    format: ".pdf",
                    size: 5 * 1024 * 1024
                }
            }
        }
    },
    {
        name: "Информационное обеспечение проекта",
        tippyName: "Перечислите ключевые каналы, через которые целевая аудитория будет узнавать о проекте (сайты, соцсети, СМИ), и приведите ссылки на них. Также добавьте 2-3 примера готовых сообщений для публикации.",
        value: "",
        translitName: "infoProvision",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Перспективы развития проекта",
        value: "",
        translitName: "devProspects",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Сайт проекта",
        value: "",
        placeholder: "Например, https://www.hr.government-nnov.ru",
        translitName: "website",
        type: "link",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Сроки реализации проекта",
        tippyName: "Укажите точные даты начала и завершения проекта с учётом времени на подготовку и итоговую отчётность. Проект может быть реализован в срок до конца 2027 года.",
        value: "",
        translitName: "execTime",
        type: "date",
    },
    {
        name: "Рекомендатели проекта",
        tippyName: "Укажите рекомендателей проекта и прикрепите рекомендательные письма от ключевых стейкхолдеров, экспертов и заинтересованных сторон. Рекомендуется объединить письма в один PDF-файл.",
        tip: "можно загрузить несколько файлов",
        translitName: "recommenders",
        type: "mixed",
        required: true,
        error: false,
        errorTxt: "Выберите файл или заполните поле",
        fields: {
            text: {
                value: '',
            },
            files: {
                value: [],
                isMultiple: true,
                validate: {
                    types: [
                        "application/pdf"
                    ],
                    format: ".pdf",
                    size: 5 * 1024 * 1024
                }
            }
        }
    },
    {
        name: "Видеовизитка проекта (ссылка на файл в облаке. Файл должен быть доступным для просмотра по ссылке)",
        value: "",
        placeholder: "Например, https://disk.yandex.ru/i/aBcDeFg12345",
        translitName: "videoURL",
        type: "link"
    },
    {
        name: "Презентация проекта",
        tippyName: "Презентация должна не дублировать заявку, а дополнять её: более детально раскрывать ключевые мероприятия, наглядно представлять команду или визуальную концепцию.",
        value: [],
        translitName: "presentation",
        type: "file",
        required: true,
        error: false,
        errorTxt: "Выберите файл",
        validate: {
            types: [
                "application/pdf",
                "application/vnd.ms-powerpoint",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            ],
            format: ".pdf, .ppt, .pptx",
            size: 5 * 1024 * 1024
        }
    },
    {
        name: "Календарный план",
        tippyName: "Заполните календарный план, используя предоставленный шаблон. Внесите все этапы и мероприятия проекта в хронологическом порядке.",
        value: [],
        translitName: "calendarPlan",
        type: "file",
        required: true,
        error: false,
        errorTxt: "Выберите файл",
        validate: {
            types: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
            format: ".xls, .xlsx",
            size: 5 * 1024 * 1024
        }
    },
    {
        name: "Руководитель проекта",
        value: "",
        translitName: "manager",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Возраст",
        value: "",
        translitName: "age",
        type: "number",
    },
    {
        name: "Телефон для связи",
        value: "",
        placeholder: "+7",
        translitName: "phone",
        type: 'tel',
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Email для связи",
        value: "",
        translitName: "email",
        type: 'email',
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Место учёбы",
        value: "",
        translitName: "edu",
    },
    {
        name: "Место работы",
        value: "",
        translitName: "workplace"
    },
    {
        name: "Страницы автора в соц сетях",
        value: "",
        translitName: "social",
        type: "social",
        data: [
            {
                name: "ВКонтакте",
                value: "",
                translitName: "vk",
                placeholder: "https://vk.com/yourpage"
            },
            {
                name: "Одноклассники",
                value: "",
                translitName: "odnoklassniki",
                placeholder: "https://ok.ru/yourpage"
            }
        ]
    },
    {
        name: "Опыт проектной деятельности руководителя проекта",
        value: "",
        translitName: "managementExperience",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Команда проекта",
        tippyName: "Укажите ключевых участников команды, их роль и функционал в проекте.",
        value: "",
        translitName: "participants",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        name: "Опыт проектной деятельности участников проекта",
        tippyName: "Укажите опыт работы ключевых участников команды проекта, их образование, ссылки на подтверждающие материалы (портфолио, сертификаты, публикации) и другую необходимую информацию.",
        value: "",
        translitName: "participantExperience",
        type: "html",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    }
]
export const projectGranteeFieldsArr = [
    {
        name: "Юридическое лицо",
        value: "1",
        data: [
            {
                name: "Наименование организации",
                value: "",
                translitName: "orgName",
                required: true,
                error: false,
                errorTxt: "Заполните поле"
            },
            {
                name: "Адрес организации",
                value: "",
                translitName: "orgAddress",
                required: true,
                error: false,
                errorTxt: "Заполните поле"
            },
            {
                name: "Реквизиты организации",
                value: "",
                translitName: "orgRequisites",
                type: "html",
                required: true,
                error: false,
                errorTxt: "Заполните поле"
            },
            {
                name: "Устав организации",
                value: [],
                translitName: "orgCharter",
                type: "granteeFile",
                validate: {
                    types: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
                    format: ".pdf, .doc, .docx",
                    size: 5 * 1024 * 1024
                },
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Свидетельство о государственной регистрации юридического лица в Едином государственном реестре юридических лиц (ЕГРЮЛ)",
                value: [],
                translitName: "legalEntityRegCert",
                type: "granteeFile"
            },
            {
                name: "Свидетельство о регистрации юридического лица в налоговом органе по месту нахождения юридического лица",
                value: [],
                translitName: "legalEntityTaxRegCert",
                type: "granteeFile"
            },
            {
                name: "Выписка из Единого государственного реестра юридических лиц (ЕГРЮЛ)",
                value: [],
                translitName: "legalEntityRegExtract",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Справка о состоянии расчетов по налогам, сборам, пеням и штрафам, выданная налоговым органом",
                value: [],
                translitName: "legalEntityTaxDebtCert",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            }
        ]
    },
    {
        name: "Индивидуальный предприниматель",
        value: "2",
        data: [
            {
                name: "Реквизиты ИП (банковские реквизиты и адрес регистрации ИП)",
                value: "",
                translitName: "ipRequisites",
                type: "html",
                required: true,
                error: false,
                errorTxt: "Заполните поле"
            },
            {
                name: "Свидетельство о государственной регистрации ИП в Едином государственном реестре индивидуальных предпринимателей (ЕГРИП)",
                value: [],
                translitName: "ipRegCert",
                type: "granteeFile"
            },
            {
                name: "Свидетельство о регистрации ИП в налоговом органе по месту нахождения",
                value: [],
                translitName: "ipTaxRegCert",
                type: "granteeFile"
            },
            {
                name: "Выписка из Единого государственного реестра индивидуальных предпринимателей (ЕГРИП)",
                value: [],
                translitName: "ipRegExtract",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Справка о состоянии расчетов по налогам, сборам, пеням и штрафам, выданная налоговым органом",
                value: [],
                translitName: "ipTaxDebtCert",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            }
        ]
    },
    {
        name: "Физическое лицо",
        value: "3",
        data: [
            {
                name: "Копия всех страниц паспорта",
                value: [],
                translitName: "passport",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Копия свидетельства о постановке на учет физического лица в налоговом органе на территории Российской Федерации",
                value: [],
                translitName: "taxRegCert",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Справка об отсутствии задолженности по налогам, сборам, пеням и штрафам, выданная налоговым органом",
                value: [],
                translitName: "taxDebtCert",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Декларация (заверение) гражданина о том, что он не признан банкротом и он не находится в состоянии реструктуризации его долгов",
                value: [],
                translitName: "bankruptcyDeclaration",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Справка об отсутствии судимости и (или) факта уголовного преследования либо о прекращении уголовного преследования, выданная органом внутренних дел",
                value: [],
                translitName: "criminalRecordCert",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            }
        ]
    },
    {
        name: "Физическое лицо - самозанятый",
        value: "4",
        data: [
            {
                name: "Копия всех страниц паспорта",
                value: [],
                translitName: "passport",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Копия свидетельства о постановке на учет физического лица в налоговом органе на территории Российской Федерации",
                value: [],
                translitName: "taxRegCert",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Справка об отсутствии задолженности по налогам, сборам, пеням и штрафам, выданная налоговым органом",
                value: [],
                translitName: "taxDebtCert",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Декларация (заверение) гражданина о том, что он не признан банкротом и он не находится в состоянии реструктуризации его долгов",
                value: [],
                translitName: "bankruptcyDeclaration",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: "Справка об отсутствии судимости и (или) факта уголовного преследования либо о прекращении уголовного преследования, выданная органом внутренних дел",
                value: [],
                translitName: "criminalRecordCert",
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
            {
                name: 'Справка, подтверждающая статус плательщика налога на профессиональный доход',
                value: [],
                translitName: 'selfEmployedTaxCert',
                type: "granteeFile",
                required: true,
                error: false,
                errorTxt: "Выберите файл"
            },
        ]
    },
]

export const monthArr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
