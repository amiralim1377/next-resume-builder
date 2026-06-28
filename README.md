
```
next-resume-builder
├─ .commitlintrc.js
├─ .husky
│  ├─ pre-commit
│  └─ _
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-checkout
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-merge-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ .npmrc
├─ .prettierrc
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ fonts
│  │  ├─ inter
│  │  │  ├─ Inter_18pt-Bold.ttf
│  │  │  ├─ Inter_18pt-ExtraBold.ttf
│  │  │  ├─ Inter_18pt-Italic.ttf
│  │  │  ├─ Inter_18pt-Light.ttf
│  │  │  ├─ Inter_18pt-Medium.ttf
│  │  │  ├─ Inter_18pt-Regular.ttf
│  │  │  ├─ Inter_18pt-SemiBold.ttf
│  │  │  └─ Inter_18pt-Thin.ttf
│  │  └─ yekanbakh
│  │     ├─ Yekan.ttf
│  │     ├─ YekanBakhFaNum-Black.woff2
│  │     ├─ YekanBakhFaNum-BlackExpanded.woff2
│  │     ├─ YekanBakhFaNum-Bold.woff2
│  │     ├─ YekanBakhFaNum-ExtraBlack.woff2
│  │     ├─ YekanBakhFaNum-ExtraBold.woff2
│  │     ├─ YekanBakhFaNum-Light.woff2
│  │     ├─ YekanBakhFaNum-Regular.woff2
│  │     ├─ YekanBakhFaNum-SemiBold.woff2
│  │     └─ YekanBakhFaNum-Thin.woff2
│  ├─ icons
│  │  └─ check_circle.svg
│  └─ images
│     ├─ hero-illustration.webp
│     └─ IMG_20251101_203439_943.jpg
├─ README.md
├─ src
│  ├─ app
│  │  └─ [locale]
│  │     ├─ (panel)
│  │     │  └─ panel
│  │     │     ├─ layout.tsx
│  │     │     ├─ new
│  │     │     │  └─ page.tsx
│  │     │     └─ page.tsx
│  │     ├─ api
│  │     ├─ blog
│  │     │  └─ page.tsx
│  │     ├─ globals.css
│  │     ├─ layout.tsx
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ layout
│  │  │  ├─ footer
│  │  │  │  ├─ components
│  │  │  │  │  ├─ AboutSite
│  │  │  │  │  │  └─ index.tsx
│  │  │  │  │  ├─ ConnectWithUs
│  │  │  │  │  │  └─ index.tsx
│  │  │  │  │  └─ QuickLinks
│  │  │  │  │     └─ index.tsx
│  │  │  │  └─ index.tsx
│  │  │  ├─ header
│  │  │  │  ├─ components
│  │  │  │  │  ├─ DesktopHeaderNavigation
│  │  │  │  │  │  └─ index.tsx
│  │  │  │  │  ├─ LanguageToggle
│  │  │  │  │  │  └─ index.tsx
│  │  │  │  │  ├─ LogoWithText
│  │  │  │  │  │  └─ index.tsx
│  │  │  │  │  ├─ MobileHeader
│  │  │  │  │  │  └─ index.tsx
│  │  │  │  │  └─ ThemeToggleButton
│  │  │  │  │     └─ index.tsx
│  │  │  │  └─ index.tsx
│  │  │  └─ panelSidebar
│  │  │     ├─ components
│  │  │     │  ├─ PanelSidebarNavigation
│  │  │     │  │  └─ index.tsx
│  │  │     │  └─ PanelSidebarUserInfo
│  │  │     │     └─ index.tsx
│  │  │     └─ index.tsx
│  │  ├─ pages
│  │  │  └─ HomePage
│  │  │     ├─ components
│  │  │     │  ├─ CareerBoostHub
│  │  │     │  │  └─ index.tsx
│  │  │     │  ├─ FrequentlyAskedQuestions
│  │  │     │  │  ├─ index.module.css
│  │  │     │  │  └─ index.tsx
│  │  │     │  ├─ HeroSection
│  │  │     │  │  └─ index.tsx
│  │  │     │  ├─ HeroSectionContent
│  │  │     │  │  ├─ hook
│  │  │     │  │  │  └─ useHeroClasses
│  │  │     │  │  │     └─ index.tsx
│  │  │     │  │  └─ index.tsx
│  │  │     │  ├─ HeroSectionImage
│  │  │     │  │  └─ HeroSectionImage.tsx
│  │  │     │  ├─ HomePageFAQ
│  │  │     │  │  └─ index.tsx
│  │  │     │  ├─ SuccessStories
│  │  │     │  │  └─ index.tsx
│  │  │     │  ├─ SuccessStoriesCard
│  │  │     │  │  └─ index.tsx
│  │  │     │  ├─ SuccessStoriesList
│  │  │     │  │  └─ index.tsx
│  │  │     │  └─ SummaryStats
│  │  │     │     └─ index.tsx
│  │  │     └─ index.tsx
│  │  ├─ shared
│  │  │  └─ ConditionalRenderer
│  │  │     └─ index.tsx
│  │  ├─ svg
│  │  │  ├─ AlignCenterSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ AlignLeftSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ AlignRightSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ BoldSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ BulletListSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ CameraSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ CheckCircle
│  │  │  │  └─ index.tsx
│  │  │  ├─ ChevronDown
│  │  │  │  └─ index.tsx
│  │  │  ├─ CloseSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ DarkSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ GitHubSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ ItalicSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ LanguageSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ LightSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ LinkdinSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ LinkSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ NumberListSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ PersonSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ RedoSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ SiteLogo
│  │  │  │  └─ index.tsx
│  │  │  ├─ StarSvg
│  │  │  │  └─ index.tsx
│  │  │  ├─ UnderlineSvg
│  │  │  │  └─ index.tsx
│  │  │  └─ UndoSvg
│  │  │     └─ index.tsx
│  │  └─ ui
│  │     ├─ CustomAccordion
│  │     │  ├─ components
│  │     │  │  ├─ AccordionHeader
│  │     │  │  │  └─ index.tsx
│  │     │  │  ├─ ChildrenMode
│  │     │  │  │  └─ index.tsx
│  │     │  │  └─ DataMode
│  │     │  │     └─ index.tsx
│  │     │  └─ index.tsx
│  │     ├─ CustomAvatar
│  │     │  └─ index.tsx
│  │     ├─ CustomBadge
│  │     │  └─ index.tsx
│  │     ├─ CustomButton
│  │     │  └─ index.tsx
│  │     ├─ CustomCalendar
│  │     │  ├─ Calendar.tsx
│  │     │  ├─ components
│  │     │  │  ├─ CalendarCell.tsx
│  │     │  │  ├─ CalendarGrid.tsx
│  │     │  │  └─ CalendarHeader.tsx
│  │     │  ├─ constants.ts
│  │     │  ├─ context
│  │     │  │  └─ CalendarContext.tsx
│  │     │  ├─ hooks
│  │     │  │  └─ useCalendarState.ts
│  │     │  ├─ index.ts
│  │     │  ├─ types.ts
│  │     │  └─ utils
│  │     │     └─ dateUtils.ts
│  │     ├─ CustomCheckBox
│  │     │  └─ index.tsx
│  │     ├─ CustomClickEffect
│  │     │  └─ index.tsx
│  │     ├─ CustomControlledCalendar
│  │     │  ├─ hooks
│  │     │  │  └─ useOnClickOutside
│  │     │  │     └─ index.ts
│  │     │  └─ index.tsx
│  │     ├─ CustomControlledCheckBox
│  │     │  └─ index.tsx
│  │     ├─ CustomControlledInput
│  │     │  └─ index.tsx
│  │     ├─ CustomControlledPhotoUploader
│  │     │  └─ index.tsx
│  │     ├─ CustomControlledResumeSummary
│  │     │  └─ index.tsx
│  │     ├─ CustomControlledSelect
│  │     │  └─ index.tsx
│  │     ├─ CustomDropdown
│  │     │  └─ index.tsx
│  │     ├─ CustomFormStepper
│  │     │  ├─ components
│  │     │  │  └─ ConnectorLine
│  │     │  │     └─ index.tsx
│  │     │  └─ index.tsx
│  │     ├─ CustomFormStepperItem
│  │     │  ├─ components
│  │     │  │  └─ ConnectorLine
│  │     │  │     └─ index.tsx
│  │     │  └─ index.tsx
│  │     ├─ CustomInput
│  │     │  └─ index.tsx
│  │     ├─ CustomLabel
│  │     │  └─ index.tsx
│  │     ├─ CustomLink
│  │     │  └─ index.tsx
│  │     ├─ CustomLoadingView
│  │     │  ├─ BasicLoader.tsx
│  │     │  └─ index.tsx
│  │     ├─ CustomModal
│  │     │  └─ index.tsx
│  │     ├─ CustomPhotoUploader
│  │     │  ├─ components
│  │     │  │  └─ UserProfileEditorModal
│  │     │  │     └─ index.tsx
│  │     │  ├─ hooks
│  │     │  │  └─ useImageEditor
│  │     │  │     └─ index.tsx
│  │     │  └─ index.tsx
│  │     ├─ CustomPopover
│  │     │  └─ index.tsx
│  │     ├─ CustomProgress
│  │     │  └─ index.tsx
│  │     ├─ CustomProgressLabel
│  │     │  └─ index.tsx
│  │     ├─ CustomRadio
│  │     │  ├─ index.tsx
│  │     │  └─ RadioGroup.tsx
│  │     ├─ CustomRateStar
│  │     │  └─ index.tsx
│  │     ├─ CustomResumeCardComponents
│  │     │  └─ index.tsx
│  │     ├─ CustomResumeEditor
│  │     │  ├─ components
│  │     │  │  ├─ ResumeAddLinkModal
│  │     │  │  │  └─ index.tsx
│  │     │  │  └─ ResumeRemoveLinkModal
│  │     │  │     └─ index.tsx
│  │     │  └─ index.tsx
│  │     ├─ CustomSelect
│  │     │  └─ index.tsx
│  │     ├─ CustomStat
│  │     │  └─ index.tsx
│  │     ├─ CustomStyledLink
│  │     │  └─ index.tsx
│  │     ├─ CustomTab
│  │     │  ├─ context.ts
│  │     │  ├─ CustomTab-list.tsx
│  │     │  ├─ CustomTab-panel.tsx
│  │     │  ├─ CustomTab-trigger.tsx
│  │     │  ├─ CustomTabs-root.tsx
│  │     │  └─ index.ts
│  │     ├─ CustomText
│  │     │  └─ index.tsx
│  │     ├─ CustomTextarea
│  │     │  └─ index.tsx
│  │     ├─ CustomTooltip
│  │     │  └─ index.tsx
│  │     ├─ CustomUserInfo
│  │     │  └─ index.tsx
│  │     └─ NewCustomAccordion
│  │        ├─ accordion-content.tsx
│  │        ├─ accordion-item.tsx
│  │        ├─ accordion-root.tsx
│  │        ├─ accordion-trigger.tsx
│  │        ├─ context.ts
│  │        ├─ index.ts
│  │        └─ README.MD
│  ├─ core
│  │  ├─ constants
│  │  │  ├─ constant.ts
│  │  │  ├─ persistKeys.ts
│  │  │  ├─ routesName.ts
│  │  │  ├─ socialLinks.ts
│  │  │  └─ types.ts
│  │  └─ data
│  │     ├─ CefrLevelsData.ts
│  │     ├─ cities.ts
│  │     ├─ countries.ts
│  │     ├─ descriptiveLevelsData.ts
│  │     ├─ languageDisplayModeData.ts
│  │     ├─ languagesData.ts
│  │     ├─ monthsData.ts
│  │     └─ province.ts
│  ├─ features
│  │  └─ resume
│  │     ├─ components
│  │     │  ├─ FormStepper
│  │     │  │  └─ index.tsx
│  │     │  ├─ NavigationButtons
│  │     │  │  └─ index.tsx
│  │     │  ├─ ResumeFormProvider
│  │     │  │  ├─ index.tsx
│  │     │  │  └─ ResumeFormContext.ts
│  │     │  ├─ RowStatusObserver
│  │     │  │  └─ index.tsx
│  │     │  ├─ Steps
│  │     │  │  ├─ BasicInfoStep
│  │     │  │  │  ├─ components
│  │     │  │  │  │  ├─ BasicInformation
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ BasicInfoSection
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ ContactDetails
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ ContactInformationSection
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ LocationDetails
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ ProfilePhotoUploader
│  │     │  │  │  │  │  ├─ components
│  │     │  │  │  │  │  │  └─ EditorModal
│  │     │  │  │  │  │  │     └─ index.tsx
│  │     │  │  │  │  │  ├─ hooks
│  │     │  │  │  │  │  │  └─ useImageEditor
│  │     │  │  │  │  │  │     └─ index.tsx
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ ResumeSummary
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  └─ UserProfileSection
│  │     │  │  │  │     └─ index.tsx
│  │     │  │  │  ├─ hooks
│  │     │  │  │  │  └─ useGetBasicInfoStepData
│  │     │  │  │  │     └─ index.tsx
│  │     │  │  │  └─ index.tsx
│  │     │  │  ├─ EducationStep
│  │     │  │  │  ├─ components
│  │     │  │  │  │  ├─ EducationAccordionHeader
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ EducationItem
│  │     │  │  │  │  │  ├─ components
│  │     │  │  │  │  │  │  └─ RowStatusObserver
│  │     │  │  │  │  │  │     └─ index.tsx
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  └─ EducationSummary
│  │     │  │  │  │     └─ index.tsx
│  │     │  │  │  ├─ hooks
│  │     │  │  │  │  └─ useGetEducationInfoStepData
│  │     │  │  │  │     └─ index.tsx
│  │     │  │  │  └─ index.tsx
│  │     │  │  ├─ EmptyStep
│  │     │  │  │  └─ index.tsx
│  │     │  │  ├─ JobStep
│  │     │  │  │  ├─ components
│  │     │  │  │  │  ├─ JobAccordionHeader
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ JobItem
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  └─ JobSummary
│  │     │  │  │  │     └─ index.tsx
│  │     │  │  │  ├─ hooks
│  │     │  │  │  │  └─ useGetJobInfoStepData
│  │     │  │  │  │     └─ index.tsx
│  │     │  │  │  └─ index.tsx
│  │     │  │  ├─ ProjectsStep
│  │     │  │  │  ├─ components
│  │     │  │  │  │  ├─ ProjectAccordionHeader
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ ProjectItem
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  └─ ProjectSummary
│  │     │  │  │  │     └─ index.tsx
│  │     │  │  │  ├─ hooks
│  │     │  │  │  └─ index.tsx
│  │     │  │  ├─ ResearchStep
│  │     │  │  │  ├─ components
│  │     │  │  │  │  ├─ ResearchAccordionHeader
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  ├─ ResearchItem
│  │     │  │  │  │  │  └─ index.tsx
│  │     │  │  │  │  └─ ResearchSummary
│  │     │  │  │  │     └─ index.tsx
│  │     │  │  │  ├─ hooks
│  │     │  │  │  │  └─ useGetResearchInfoStepData
│  │     │  │  │  │     └─ index.tsx
│  │     │  │  │  └─ index.tsx
│  │     │  │  └─ SkillsStep
│  │     │  │     ├─ components
│  │     │  │     │  ├─ CoreSkillsSection
│  │     │  │     │  │  ├─ components
│  │     │  │     │  │  │  ├─ CoreSkillAccordionHeader
│  │     │  │     │  │  │  │  └─ index.tsx
│  │     │  │     │  │  │  └─ SkillItem
│  │     │  │     │  │  │     └─ index.tsx
│  │     │  │     │  │  └─ index.tsx
│  │     │  │     │  ├─ CoursesCertificationsSection
│  │     │  │     │  │  ├─ components
│  │     │  │     │  │  │  ├─ CoursesCertificationsAccordionHeader
│  │     │  │     │  │  │  │  └─ index.tsx
│  │     │  │     │  │  │  └─ CoursesCertificationsItem
│  │     │  │     │  │  │     └─ index.tsx
│  │     │  │     │  │  └─ index.tsx
│  │     │  │     │  └─ LanguageSection
│  │     │  │     │     ├─ components
│  │     │  │     │     │  ├─ BreakdownProficiencyFields
│  │     │  │     │     │  │  └─ index.tsx
│  │     │  │     │     │  ├─ LanguageAccordionHeader
│  │     │  │     │     │  │  └─ index.tsx
│  │     │  │     │     │  ├─ LanguageItem
│  │     │  │     │     │  │  └─ index.tsx
│  │     │  │     │     │  └─ OverallProficiencyFields
│  │     │  │     │     │     └─ index.tsx
│  │     │  │     │     └─ index.tsx
│  │     │  │     ├─ hooks
│  │     │  │     │  └─ useGetSkillsInfoStepData
│  │     │  │     │     └─ index.tsx
│  │     │  │     └─ index.tsx
│  │     │  └─ StepWrapper
│  │     │     └─ index.tsx
│  │     ├─ constants
│  │     │  └─ steps.ts
│  │     ├─ hooks
│  │     │  ├─ useResumeForm.ts
│  │     │  └─ useStepValidation.ts
│  │     ├─ schemas
│  │     │  ├─ BasicInfoSchema
│  │     │  │  └─ index.ts
│  │     │  ├─ CoursesAndCertificationsSchema
│  │     │  │  └─ index.ts
│  │     │  ├─ EducationSchema
│  │     │  │  └─ index.ts
│  │     │  ├─ JobSchema
│  │     │  │  └─ index.ts
│  │     │  ├─ LanguageSchema
│  │     │  │  ├─ index.ts
│  │     │  │  └─ language.ts
│  │     │  ├─ ProfileImageSchema
│  │     │  │  └─ index.ts
│  │     │  ├─ ProjectsSchema
│  │     │  │  └─ index.ts
│  │     │  ├─ ResearchSchema
│  │     │  │  └─ index.ts
│  │     │  ├─ resume.schema.ts
│  │     │  └─ SkillsSchema
│  │     │     └─ index.ts
│  │     ├─ types
│  │     │  └─ resume.types.ts
│  │     └─ utils
│  │        ├─ formDefaultResumeValues.ts
│  │        └─ stepper.utils.ts
│  ├─ font
│  │  └─ index.ts
│  ├─ hooks
│  │  ├─ useBoldFontWeight
│  │  │  └─ index.tsx
│  │  ├─ useHover
│  │  │  └─ index.tsx
│  │  └─ useWindowSize
│  │     └─ index.tsx
│  ├─ lib
│  │  ├─ forms
│  │  ├─ i18n
│  │  │  ├─ client.ts
│  │  │  ├─ locales
│  │  │  │  ├─ en
│  │  │  │  │  ├─ common.json
│  │  │  │  │  ├─ footer.json
│  │  │  │  │  ├─ form.json
│  │  │  │  │  └─ home.json
│  │  │  │  └─ fa
│  │  │  │     ├─ common.json
│  │  │  │     ├─ footer.json
│  │  │  │     ├─ form.json
│  │  │  │     └─ home.json
│  │  │  ├─ server.ts
│  │  │  └─ settings.ts
│  │  └─ validations
│  │     └─ resume.schema.ts
│  ├─ provider
│  │  ├─ lngProvider
│  │  │  └─ index.tsx
│  │  ├─ MainProvider.tsx
│  │  ├─ PageLoadingProvider
│  │  │  └─ index.tsx
│  │  ├─ themeProvider
│  │  │  ├─ colors.ts
│  │  │  ├─ index.tsx
│  │  │  ├─ types.ts
│  │  │  └─ useThemeColors.tsx
│  │  └─ widthProvider
│  │     └─ index.tsx
│  ├─ services
│  ├─ store
│  ├─ types
│  │  └─ index.ts
│  └─ utils
│     ├─ cn
│     │  └─ index.ts
│     ├─ getFontFamily
│     │  └─ index.ts
│     ├─ getHref
│     │  └─ index.ts
│     ├─ regex
│     │  └─ index.ts
│     ├─ richText
│     │  └─ index.ts
│     └─ validators
│        └─ hasFarsiLetters
│           └─ index.ts
└─ tsconfig.json

```