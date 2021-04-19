/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Context from '../../globalState'
import { checkIfCurrentSession, createUUID } from '../../utils'
import { MainWrapper } from './styles'
import TextareaAutosize from 'react-textarea-autosize'
import { CorrectAnswer, IFormOption, IQuestion } from './models'
import { createQuestion } from './services'
import { LoadingOutlined } from '@ant-design/icons'

export const CreatePlayground = () => {
  const { state, setCurrentUser } = useContext(Context)
  const { register, handleSubmit, setValue } = useForm()
  const [question, setQuestion] = useState('')
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [currentQuestionLength, setCurrentQuestionLength] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const maxQuestionLength = 120
  const { user: currentUser } = state

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  const options: IFormOption[] = [
    { id: 'optionA', name: 'optionA', label: 'a' },
    { id: 'optionB', name: 'optionB', label: 'b' },
    { id: 'optionC', name: 'optionC', label: 'c' },
    { id: 'optionD', name: 'optionD', label: 'd' },
  ]

  const [optionsState, setOptionsState] = useState<boolean[]>(
    options.map(() => false)
  )

  useEffect(() => {
    const currentUser = checkIfCurrentSession()
    setCurrentUser(currentUser)
  }, [])

  const submitQuestion = async (formData: any) => {
    const values: string[] = Object.values(formData)

    if (
      values.map(singleValue => singleValue.trim()).includes('') ||
      question.trim() === ''
    ) {
      alert('Debes llenar todos los campos')
      return
    }

    if (!optionsState.includes(true)) {
      alert('Debes seleccionar cuál es la respuesta correcta')
      return
    }

    const newQuestion: IQuestion = {
      id: createUUID(),
      createdBy: currentUser.nickname,
      question,
      options: {
        a: formData.optionA,
        b: formData.optionB,
        c: formData.optionC,
        d: formData.optionD,
      },
      correct: getCorrectLabel(),
    }

    setIsLoading(true)

    createQuestion(newQuestion)
      .then(() => {
        console.log('%cQuestion created', 'color: green; font-weight: bolder')
        handleFormReset()
        setIsLoading(false)
        setShowCompleteModal(true)
        setTimeout(() => setShowCompleteModal(false), 3000)
      })
      .catch(err => {
        console.log(
          '%cError creating the question',
          'color: red; font-weight: bolder',
          err
        )
        setIsLoading(false)
        alert('Hubo un error creando la pregunta, vuelve a intentarlo')
      })
  }

  const getCorrectLabel = (): CorrectAnswer => {
    const correctIndex = optionsState.findIndex(singleState => singleState)
    const correctOption = options[correctIndex]
    const correctLabel = correctOption.label

    return correctLabel
  }

  const handleQuestionUpdate = (currentValue: string) => {
    setCurrentQuestionLength(currentValue.length)

    currentValue.length < maxQuestionLength && setQuestion(currentValue)
  }

  const handleSelectCorrectOption = (index: number) => {
    setOptionsState(optionsState.map((singleState, _index) => _index === index))
  }

  const handleFormReset = () => {
    setQuestion('')
    setCurrentQuestionLength(0)
    setOptionsState(options.map(() => false))
    const fields = options.map(singleOption => singleOption.name)
    fields.forEach(singleField => {
      setValue(singleField, '')
    })
  }

  return (
    <MainWrapper>
      <div className="top-section">
        <h2 className="create-title"> Crea una pregunta </h2>
        <p className="create-subtitle">
          {' '}
          (Dale click al ícono de la respuesta correcta){' '}
        </p>
      </div>
      <form onSubmit={handleSubmit(submitQuestion)}>
        <div className="form-wrapper">
          <TextareaAutosize
            placeholder="Escribe tu pregunta"
            autoCorrect="off"
            spellCheck="false"
            className="question-input"
            value={question}
            rows={6}
            onChange={event => handleQuestionUpdate(event.target.value)}
          />
          <p className="char-tracker">
            {' '}
            {currentQuestionLength}/{maxQuestionLength}{' '}
          </p>

          <div className="options-section">
            {options.map(({ name, id, label }, index) => (
              <div key={id} className="single-option-wrapper">
                <p className="option"> {label.toUpperCase()}. </p>
                <input
                  id={id}
                  autoComplete="off"
                  className="input-option"
                  placeholder={`Escribe la opción ${label}`}
                  {...register(name)}
                />
                {optionsState[index] ? (
                  <p className="option-indicator"> ✅ </p>
                ) : (
                  <p
                    onClick={() => handleSelectCorrectOption(index)}
                    className="option-indicator"
                  >
                    {' '}
                    ❌{' '}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="buttons-section">
            <Button type="primary" onClick={handleFormReset} danger>
              {' '}
              Reset{' '}
            </Button>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </div>

          {showCompleteModal && (
            <div
              onClick={() => setShowCompleteModal(false)}
              className="complete-modal"
            >
              <p className="complete-modal-text"> Pregunta creada ! </p>
            </div>
          )}

          {isLoading && (
            <div className="loading-indicator">
              <Spin indicator={antIcon} size="large" />
            </div>
          )}
        </div>
      </form>
    </MainWrapper>
  )
}
