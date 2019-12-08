import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    fail: '',
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, fail: '' });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      loading: true,
      fail: '',
    });

    try {
      const { newRepo, repositories } = this.state;

      if (!newRepo) {
        throw Error('Informe um repositório');
      }

      const hasRepo = repositories.find(
        r => r.name.toLowerCase() === newRepo.toLowerCase()
      );

      if (hasRepo) {
        throw Error('O repositório já se encontra na lista');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        fail: error.request ? 'Repositório não encontrado' : error.message,
      });
    }
  };

  hundleDelete = repo => {
    const { repositories } = this.state;

    this.setState({
      repositories: repositories.filter(r => r.name !== repo),
    });
  };

  render() {
    const { newRepo, repositories, loading, fail } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} fail={fail}>
          <div>
            <span>
              <input
                type="text"
                placeholder="Adicionar Repositório"
                value={newRepo}
                onChange={this.handleInputChange}
              />

              <SubmitButton loading={loading ? 1 : 0}>
                {loading ? (
                  <FaSpinner color="#fff" size={14} />
                ) : (
                  <FaPlus color="#fff" size={14} />
                )}
              </SubmitButton>
            </span>
            <p>{fail}</p>
          </div>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <div>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
                <button
                  onClick={() => this.hundleDelete(repository.name)}
                  type="submit"
                >
                  <FaRegTrashAlt color="#b22222" size={14} />
                </button>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
